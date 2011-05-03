HipmunkAirTrafficController = function(doc) {
  this.doc = doc;
};
HipmunkAirTrafficController.prototype = new AirTrafficController();

HipmunkAirTrafficController.prototype.tripClass = HipmunkTrip;
HipmunkAirTrafficController.prototype.events = Util.mergeObjects(HipmunkAirTrafficController.prototype.events, {
  pollInterval: function(controller) {
    return function() {
      controller.clear();
    }
  },

  tripEmissionsComplete: function(trip, cm1Response, flight) {
    HallOfFame.induct(trip);
  }
});

HipmunkAirTrafficController.prototype.tripElements = function() {
  var resultTable = this.doc.getElementsByClassName('results-table')[0];
  return resultTable.getElementsByClassName('routing');
};

HipmunkAirTrafficController.prototype.poll = function() {
  setInterval(this.events.pollInterval(this), 1000);   // every 1 second
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
  trip.infoView().updateSearchAverage(HallOfFame.average(), trip);
  if(trip.embeddedInfoView())
    trip.embeddedInfoView().updateSearchAverage(HallOfFame.average(), trip);
  //trip.infoView().updateTripAverage(trip);  this is too difficult right now
};
