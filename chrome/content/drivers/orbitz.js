var Orbitz = {
  name: 'Orbitz',
  searchPattern: 'orbitz.com/App/ViewFlightSearchResults',

  insertAttribution: function() {
    var parentElement = top.window.document.getElementById('matrix');
    if(parentElement) {
      var referenceElement = top.window.document.getElementById('airResultMatrix');
      Careplane.insertBadge(parentElement, null, '');
    } else {
      Careplane.log('Unable to find #matrix');
    }
  },

  scoreFlights: function(doc) {
    Orbitz.doc = doc;
    var airResults = Orbitz.doc.getElementsByClassName('airResults')[0];

    if(airResults) {
      var results = airResults.getElementsByClassName('result');

      Careplane.log('Got ' + results.length + ' results');
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        var scoreKeeper = new OrbitzScoreKeeper(result);
        scoreKeeper.officiate();
      }
    } else {
      Careplane.log("Couldn't find an airResults element");
    }
  }
}


// OrbitzScoreKeeper

OrbitzScoreKeeper = function(resultNode) {
  this.resultNode = resultNode;
  this.legs = this.resultNode.getElementsByClassName('resultLeg');
  this.completeCount = 0;
  this.totalEmissions = 0;

  this.totalFootprintP = Orbitz.doc.createElement('p');
  this.totalFootprintP.setAttribute('class', 'careplane-footprint total-footprint');
  this.totalFootprintP.style.color = '#666';
  this.totalFootprintP.style.backgroundColor = '#adf';
  this.totalFootprintP.style.marginBottom = '0';
  this.totalFootprintP.style.padding = '7px 15px';
  this.totalFootprintP.innerHTML = '<i>Loading Careplane footprint &hellip;</i>';
  this.resultNode.appendChild(this.totalFootprintP);
};

OrbitzScoreKeeper.prototype.officiate = function() {
  Careplane.log('result has ' + this.legs + ' legs');
  for(var i = 0; i < this.legs.length; i++) {
    var leg = this.legs[i];
    var flight = OrbitzFlight.parse(leg);
    flight.emissionEstimate(this.onEmissionsSuccess(leg, this));
  }
};

OrbitzScoreKeeper.prototype.onEmissionsSuccess = function(legElement, scoreKeeper) {
  return function(emission) {
    scoreKeeper.completeCount++;
    scoreKeeper.totalEmissions += emission;
    if(scoreKeeper.completeCount == scoreKeeper.legs.length) {
      scoreKeeper.onEmissionsFinished();
    }
  };
};

OrbitzScoreKeeper.prototype.onEmissionsFinished = function() {
  this.totalFootprintP.innerHTML = Careplane.formatFootprint(this.totalEmissions);
};


// OrbitzFlight

OrbitzFlight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
};
OrbitzFlight.prototype = Flight.prototype;

OrbitzFlight.parse = function(legElement) {
  var origin, destination, airline, aircraft;

  var airCodes = legElement.getElementsByClassName('airCode');
  origin = airCodes[0].getElementsByTagName('span')[0].innerHTML;
  destination = airCodes[1].getElementsByTagName('span')[0].innerHTML;

  var legTable = legElement.getElementsByTagName('table')[0];
  var col3 = legTable.getElementsByClassName('col3')[0];
  var legTitle = col3.getElementsByClassName('legTitle')[0];
  airline = legTitle.innerHTML;
  airline = airline.match(/([^\d]+)/)[1];
  airline = airline.replace(/\s+$/,'');

  var extraInfo = legElement.getElementsByClassName('legExtraInfo')[0];
  var aircraftLi = extraInfo.getElementsByTagName('li')[2];
  aircraft = aircraftLi.innerHTML;

  return new OrbitzFlight(origin, destination, airline, aircraft);
};
