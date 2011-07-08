KayakAirTrafficController = function(doc) {
  this.doc = doc;
  this.url = doc ? this.doc.location.href : null;
  this.tripClass = KayakTrip;
};
KayakAirTrafficController.prototype = new AirTrafficController();
KayakAirTrafficController.events = new AirTrafficControllerEvents();

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
    $('.results_price', trip.tripElement).
      click(controller.events.purchase(controller, trip));
  });
};
