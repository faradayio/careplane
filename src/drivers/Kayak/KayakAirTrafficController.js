KayakAirTrafficController = function(doc) {
  this.doc = doc;
  this.url = this.doc.location.href;
  this.tripClass = KayakTrip;
};
KayakAirTrafficController.prototype = new AirTrafficController();

KayakAirTrafficController.create = function(doc) {
  return KayakAirTrafficController.prototype.create(KayakAirTrafficController, doc);
};

KayakAirTrafficController.prototype.routeMatches = function() {
  if(!this._routeMatches && this.url)
    this._routeMatches = this.url.match(/#flights\/([^\-]+)-([^\/]+)\//);

  return this._routeMatches;
};

KayakAirTrafficController.prototype.origin = function() {
  return this.routeMatches() ? this.routeMatches()[1] : '';
};
KayakAirTrafficController.prototype.destination = function() {
  return this.routeMatches() ? this.routeMatches()[2] : '';
};

KayakAirTrafficController.prototype.tripElements = function() {
  return $('.flightresult', this.doc);
};

KayakAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    $('.results_price', trip.tripElement).click(controller.events.purchase(controller, trip));
  });
};
