KayakAirTrafficController = function(doc) {
  this.doc = doc;
};
KayakAirTrafficController.prototype = new AirTrafficController();

KayakAirTrafficController.prototype.tripClass = KayakTrip;
KayakAirTrafficController.prototype.events = Util.mergeObjects(KayakAirTrafficController.prototype.events, {
  pollInterval: function(controller) {
    return function() {
      controller.clear();
    }
  },

  tripEmissionsComplete: function(trip, cm1Response, flight) {
    HallOfFame.induct(trip);
  }
});

KayakAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('flightresult');
};

KayakAirTrafficController.prototype.poll = function() {
  setInterval(this.events.pollInterval(this), 1000);   // every 1 second
};

KayakAirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
  this.rateTrips();
};

KayakAirTrafficController.prototype.scoreTrips = function() {
  for(var i in this.trips) {
    var trip = this.trips[i];
    if(trip.isScorable) {
      trip.score(this.events.flightEmissionsComplete,
                 this.events.tripEmissionsComplete);
    }
  }
};
