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
      //Careplane.log('scoring flights');

      var controller = new OrbitzAirTrafficController();
      controller.scoreTrips();
    }
  }
}



OrbitzAirTrafficController = function() {
  this.trips = [];
  this.tripElements = Careplane.webDoc.getElementsByClassName('result');
  this.completedTrips = 0;
};
OrbitzAirTrafficController.prototype = new AirTrafficController();

OrbitzAirTrafficController.prototype.scoreTrips = function() {
  for(var i = 0; i < this.tripElements.length; i++) {
    var tripElement = this.tripElements.item(i);
    var trip = new OrbitzTrip(tripElement);
    this.trips.push(trip);
    trip.score(this.onTripEmissionsComplete());
  }
}

OrbitzAirTrafficController.prototype.onTripEmissionsComplete = function() {
  var controller = this;
  return function() {
    //Careplane.log('onTripEmissionsComplete');
    if(++controller.completedTrips == controller.tripElements.length) {
      //Careplane.log('all trips finished');
      controller.rateTrips();
    }
  }
};



OrbitzTrip = function(resultNode) {
  this.resultNode = resultNode;
  this.completedFlightCount = 0;
  this.totalFootprint = 0;

  this.footprintParagraph = Careplane.webDoc.createElement('p');
  this.footprintParagraph.setAttribute('class', 'careplane-footprint total-footprint');
  this.footprintParagraph.style.color = '#000';
  this.footprintParagraph.style.backgroundColor = '#FFF';
  this.footprintParagraph.style.margin = '0';
  this.footprintParagraph.style.padding = '7px 15px';
  this.footprintParagraph.innerHTML = '<i>Loading Careplane footprint &hellip;</i>';
  this.resultNode.appendChild(this.footprintParagraph);
};
OrbitzTrip.prototype = new Trip();

OrbitzTrip.prototype.flights = function() {
  if(!this._flights) {
    this._flights = [];
    var legs = this.resultNode.getElementsByClassName('resultLeg');
    for(var i = 0; i < legs.length; i++) {
      this._flights.push(OrbitzFlight.parse(legs[i]));
    }
  }
  return this._flights;
}

OrbitzTrip.prototype.score = function(onTripEmissionsComplete) {
  for(var i in this.flights()) {
    var flight = this.flights()[i];
    flight.emissionEstimate(this.onFlightEmissionsComplete(onTripEmissionsComplete));
  }
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
  //Careplane.log('Using airline "' + airline + '"');

  var extraInfo = legElement.getElementsByClassName('legExtraInfo')[0];
  var aircraftLi = extraInfo.getElementsByTagName('li')[2];
  if(aircraftLi) {
    aircraft = aircraftLi.innerHTML;
  }

  return new OrbitzFlight(origin, destination, airline, aircraft);
};
