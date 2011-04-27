HipmunkAirTrafficController = function(doc) {
  this.doc = doc;
};
HipmunkAirTrafficController.prototype = new AirTrafficController();

HipmunkAirTrafficController.prototype.tripClass = HipmunkTrip;

HipmunkAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('routing');
};

HipmunkAirTrafficController.prototype.poll = function() {
  setInterval(HipmunkAirTrafficControllerEvents.pollInterval(this), 1000);   // every 1 second
};

HipmunkAirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
  this.rateTrips();
};

HipmunkAirTrafficController.prototype.scoreTrips = function() {
  for(var i in this.trips) {
    var trip = this.trips[i];
    if(trip.isScorable) {
      trip.score(this.onFlightEmissionsComplete, HipmunkAirTrafficControllerEvents.tripEmissionsComplete);
    }
  }
};

HipmunkAirTrafficController.prototype.updateViews = function(trip, rating) {
  trip.footprintView().updateRating(rating);
  trip.embeddedInfoView().updateSearchAverage(HallOfFame.average(), trip);
  trip.infoView().updateSearchAverage(HallOfFame.average(), trip);
  //trip.infoView().updateTripAverage(trip);  this is too difficult right now
};



HipmunkAirTrafficControllerEvents = {
  pollInterval: function(controller) {
    return function() {
      controller.clear();
    }
  },

  tripEmissionsComplete: function(trip, cm1Response, flight) {
    HallOfFame.induct(trip);
  }
};
