var AirTrafficController = require('../../air-traffic-controller');
var KayakTrip = require('./kayak-trip');

var KayakAirTrafficController = function($, url) {
  this.$ = $;
  this.url = url;
  this.tripClass = KayakTrip;
  this.init();
};
KayakAirTrafficController.prototype = new AirTrafficController();

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
  return this.$('.flightresult');
};

KayakAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    controller.$('.results_price', trip.tripElement).
      click(controller.events.purchase(controller, trip));
  });
};

module.exports = KayakAirTrafficController;
