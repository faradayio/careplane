HipmunkAirTrafficController = function(doc) {
  this.doc = doc;
  this.trips = [];
  this.completedTrips = 0;
};
HipmunkAirTrafficController.prototype = new AirTrafficController();

HipmunkAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('info-panel');
};

HipmunkAirTrafficController.prototype.poll = function() {
  setInterval(Util.proxy(this.clear, this), 1000);   // every 1 second
};

HipmunkAirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
  this.rateTrips();
};

HipmunkAirTrafficController.prototype.createTrip = function(tripElement) {
  return new HipmunkTrip(tripElement);
};

HipmunkAirTrafficController.prototype.scoreTrips = function() {
  for(var i in this.trips) {
    var trip = this.trips[i];
    if(trip.isScorable) {
      trip.score(this.onFlightEmissionsComplete, HipmunkAirTrafficControllerEvents.tripEmissionsComplete);
    }
  }
};



HipmunkAirTrafficControllerEvents = {
  tripEmissionsComplete: function(trip, cm1Response, flight) {
    HallOfFame.induct(trip);
  }
};
