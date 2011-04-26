KayakAirTrafficController = function(doc) {
  this.doc = doc;
  this.trips = [];
  this.completedTrips = 0;
};
KayakAirTrafficController.prototype = new AirTrafficController();

KayakAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('flightresult');
};

KayakAirTrafficController.prototype.poll = function() {
  setInterval(KayakAirTrafficControllerEvents.pollInterval(this), 1000);   // every 1 second
};

KayakAirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
  this.rateTrips();
};

KayakAirTrafficController.prototype.createTrip = function(tripElement) {
  return new KayakTrip(tripElement);
};

KayakAirTrafficController.prototype.scoreTrips = function() {
  for(var i in this.trips) {
    var trip = this.trips[i];
    if(trip.isScorable) {
      trip.score(this.onFlightEmissionsComplete, KayakAirTrafficControllerEvents.tripEmissionsComplete);
    }
  }
};



KayakAirTrafficControllerEvents = {
  pollInterval: function(controller) {
    return function() {
      controller.clear();
    }
  },

  tripEmissionsComplete: function(trip, cm1Response, flight) {
    HallOfFame.induct(trip);
  }
};
