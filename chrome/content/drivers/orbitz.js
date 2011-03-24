var Orbitz = {
  name: 'Orbitz',
  searchPattern: 'orbitz.com/App/ViewFlightSearchResults',

  insertAttribution: function() {
    // In the sidebar
    var parentElement = top.window.document.getElementById('matrix');
    // var referenceElement = top.window.document.getElementById('airResultMatrix');
    Careplane.insertBadge(parentElement, null, null);
  },

  scoreFlights: function() {
    var airResults = top.window.document.getElementsByClassName('airResults')[0];
    var results = airResults.getElementsByClassName('result');

    for(var i = 0; i < results.length; i++) {
      var result = results[i];
      var scoreKeeper = new OrbitzScoreKeeper(result);
      scoreKeeper.officiate();
    }
  }
}


// OrbitzScoreKeeper

OrbitzScoreKeeper = function(resultNode) {
  this.resultNode = resultNode;
  this.legs = this.resultNode.getElementsByClassName('resultLeg');
  this.completeCount = 0;
  this.totalEmissions = 0;

  this.totalFootprintP = top.window.document.createElement('p');
  this.totalFootprintP.setAttribute('class', 'careplane-footprint total-footprint');
  this.totalFootprintP.style.color = '#aaa';
  this.totalFootprintP.innerHTML = 'Total emissions: <em>Loading...</em>';
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
    var footprintP = window.document.createElement('p');
    footprintP.setAttribute('class', 'careplane-footprint');
    footprintP.style.color = '#aaa';
    footprintP.innerHTML = Careplane.numberWithDelimiter(emission) + 'kg CO2e';

    legElement.appendChild(footprintP)
    scoreKeeper.completeCount++;
    scoreKeeper.totalEmissions += emission;
    if(scoreKeeper.completeCount == scoreKeeper.legs.length) {
      scoreKeeper.onEmissionsFinished();
    }
  };
};

OrbitzScoreKeeper.prototype.onEmissionsFinished = function() {
  this.totalFootprintP.innerHTML = 'Total emissions: ' + Careplane.numberWithDelimiter(this.totalEmissions) + 'kg CO2e';
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
  origin = airCodes[0].getElementsByTagName('span')[0].innerText;
  destination = airCodes[1].getElementsByTagName('span')[0].innerText;

  var legTable = legElement.getElementsByTagName('table')[0];
  airline = legTable.getElementsByClassName('col3')[0].innerText;
  airline = airline.match(/([^\d]+)/)[1];
  airline = airline.replace(/\s+$/,'');

  var extraInfo = legElement.getElementsByClassName('legExtraInfo')[0];
  var aircraftLi = extraInfo.getElementsByTagName('li')[2];
  aircraft = aircraftLi.innerText;

  return new OrbitzFlight(origin, destination, airline, aircraft);
};
