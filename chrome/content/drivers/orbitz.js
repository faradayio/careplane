var Orbitz = {
  name: 'Orbitz',
  searchPattern: 'orbitz.com/App/ViewFlightSearchResults',

  insertAttribution: function() {
    if(Careplane.webDoc.getElementById('careplane-attribution') == null) {
      // In the matrix
      var parentElement = Careplane.webDoc.getElementById('matrix');
      if(parentElement) {
        var attributionElement = Careplane.webDoc.createElement('div');
        attributionElement.setAttribute('id', 'careplane-attribution');
        attributionElement.setAttribute('class', 'matrixFooterAir');
        attributionElement.setAttribute('style', 'padding-left: 4px; padding-bottom: 0;');
        attributionElement.innerHTML = Careplane.standardTextAttribution;
        parentElement.appendChild(attributionElement);
      } else {
        Careplane.log('Unable to find #matrix');
      }
      
      // In the footer
      var footer = Careplane.webDoc.getElementById('footer');
      var container = Careplane.webDoc.createElement('div');
      container.setAttribute('style', 'clear: both; margin-top: 5px');
      footer.appendChild(container);
      Careplane.insertBadge(container, null, '');
    }
  },

  scoreFlights: function(doc, bdoc) {
    if(Careplane.webDoc.getElementsByClassName('careplane-footprint').length == 0) {
      Careplane.log('scoring flights');
      var airResults = Careplane.webDoc.getElementsByClassName('airResults')[0];

      if(airResults) {
        var results = airResults.getElementsByClassName('result');

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
}


// OrbitzScoreKeeper

OrbitzScoreKeeper = function(resultNode) {
  this.resultNode = resultNode;
  this.legs = this.resultNode.getElementsByClassName('resultLeg');
  this.completeCount = 0;
  this.totalEmissions = 0;

  this.totalFootprintP = Careplane.webDoc.createElement('p');
  this.totalFootprintP.setAttribute('class', 'careplane-footprint total-footprint');
  this.totalFootprintP.style.color = '#666';
  this.totalFootprintP.style.backgroundColor = '#adf';
  this.totalFootprintP.style.marginBottom = '0';
  this.totalFootprintP.style.padding = '7px 15px';
  this.totalFootprintP.innerHTML = '<i>Loading Careplane footprint &hellip;</i>';
  this.resultNode.appendChild(this.totalFootprintP);
};

OrbitzScoreKeeper.prototype.officiate = function() {
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
