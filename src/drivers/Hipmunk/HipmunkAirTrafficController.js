HipmunkAirTrafficController = function(doc) {
  this.doc = doc;
  this.url = this.doc.location.href;
  this.tripClass = HipmunkTrip;
};
HipmunkAirTrafficController.prototype = new AirTrafficController();

HipmunkAirTrafficController.create = function(doc) {
  return HipmunkAirTrafficController.prototype.create(HipmunkAirTrafficController, doc);
};

HipmunkAirTrafficController.prototype.origin = function() {
  var match = this.url.match(/from=([^&]+)/);
  return match ? match[1].toUpperCase() : '';
};
HipmunkAirTrafficController.prototype.destination = function() {
  var match = this.url.match(/to=([^&]+)/);
  return match ? match[1].toUpperCase() : '';
};

HipmunkAirTrafficController.prototype.tripElements = function() {
  return $('.results-table .routing', this.doc);
};

HipmunkAirTrafficController.prototype.updateViews = function(trip, rating) {
  trip.footprintView.updateRating(rating);
  trip.infoView.updateSearchAverage(HallOfFame.average(), trip);
  if(trip.embeddedInfoView())
    trip.embeddedInfoView().updateSearchAverage(HallOfFame.average(), trip);
  //trip.infoView.updateTripAverage(trip);  this is too difficult right now
};

HipmunkAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    $('', trip.tripElement).click(controller.events.purchase(this, trip));
  });
};
