HipmunkAirTrafficController = function(doc) {
  this.doc = doc;
  this.url = this.doc.location.href;
};
HipmunkAirTrafficController.prototype = new AirTrafficController();

HipmunkAirTrafficController.prototype.origin = function() {
  return this.url.match(/from=([^&]+)/)[1];
};
HipmunkAirTrafficController.prototype.destination = function() {
  return this.url.match(/to=([^&]+)/)[1];
};

HipmunkAirTrafficController.prototype.tripClass = HipmunkTrip;

HipmunkAirTrafficController.prototype.tripElements = function() {
  var resultTable = this.doc.getElementsByClassName('results-table')[0];
  return resultTable.getElementsByClassName('routing');
};

HipmunkAirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
  this.rateTrips();
};

HipmunkAirTrafficController.prototype.updateViews = function(trip, rating) {
  trip.footprintView().updateRating(rating);
  trip.infoView().updateSearchAverage(HallOfFame.average(), trip);
  if(trip.embeddedInfoView())
    trip.embeddedInfoView().updateSearchAverage(HallOfFame.average(), trip);
  //trip.infoView().updateTripAverage(trip);  this is too difficult right now
};
