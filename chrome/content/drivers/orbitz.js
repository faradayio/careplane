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

      this.controller = new OrbitzAirTrafficController();
      this.controller.scoreTrips();
    }
  }
}



OrbitzAirTrafficController = function() {};

OrbitzAirTrafficController.prototype.scoreTrips = function() {
  var tripElements = Careplane.webDoc.getElementsByClassName('result');

  for(var i = 0; i < tripElements.length; i++) {
    var tripElement = tripElements.item(i);
    var trip = new OrbitzTrip(tripElement);
    trip.score();
  }
}



OrbitzTrip = function(resultNode) {
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

OrbitzTrip.prototype.score = function() {
  for(var i = 0; i < this.legs.length; i++) {
    var leg = this.legs[i];
    var flight = OrbitzFlight.parse(leg);
    flight.emissionEstimate(this.onEmissionsSuccess(leg, this));
  }
};

OrbitzTrip.prototype.onEmissionsSuccess = function(legElement, scoreKeeper) {
  return function(emission) {
    scoreKeeper.completeCount++;
    scoreKeeper.totalEmissions += emission;
    if(scoreKeeper.completeCount == scoreKeeper.legs.length) {
      scoreKeeper.onEmissionsFinished();
    }
  };
};

OrbitzTrip.prototype.onEmissionsFinished = function() {
  this.totalFootprintP.style.color = '#000';
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
  airline = airline.replace(/[\n\r\t]+/,'');
  airline = airline.replace(/[\s]+$/,'');
  airline = airline.replace(/^[\s]+/,'');
  airline = airline.replace('&nbsp;','');
  Careplane.log('Using airline "' + airline + '"');

  var extraInfo = legElement.getElementsByClassName('legExtraInfo')[0];
  var aircraftLi = extraInfo.getElementsByTagName('li')[2];
  if(aircraftLi) {
    aircraft = aircraftLi.innerHTML;
  }

  return new OrbitzFlight(origin, destination, airline, aircraft);
};
