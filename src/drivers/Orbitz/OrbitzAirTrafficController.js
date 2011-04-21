OrbitzAirTrafficController = function(doc) {
  this.doc = doc;
  this.trips = [];
  this.completedTrips = 0;
};
OrbitzAirTrafficController.prototype = new AirTrafficController();

OrbitzAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('result');
};

OrbitzAirTrafficController.prototype.scoreTrips = function() {
  for(var i in this.trips) {
    var trip = this.trips[i];
    trip.score(
      this.onFlightEmissionsComplete,
      OrbitzAirTrafficControllerEvents.tripEmissionsComplete(this));
  }
}

OrbitzAirTrafficController.prototype.createTrip = function(tripElement) {
  return new OrbitzTrip(tripElement);
};



OrbitzAirTrafficControllerEvents = {
  tripEmissionsComplete: function(controller) {
    return function(trip, cm1Response, flight) {
      HallOfFame.induct(trip);

      if(++controller.completedTrips == controller.tripElements.length) {
        controller.rateTrips();
      }
    }
  }
};
