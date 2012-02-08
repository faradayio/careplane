var $ = require('jquery');
var AirTrafficController = require('../../air-traffic-controller');
var OrbitzTrip = require('./orbitz-trip');
var OrbitzAirTrafficControllerEvents = require('./orbitz-air-traffic-controller-events');

var OrbitzAirTrafficController = function(driver, doc) {
  this.driver = driver;
  this.doc = doc;
  this.url = doc ? this.doc.location.href : null;
  this.tripClass = OrbitzTrip;
  this.init();
};
OrbitzAirTrafficController.prototype = new AirTrafficController();

OrbitzAirTrafficController.prototype.events = new OrbitzAirTrafficControllerEvents();

OrbitzAirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
};

OrbitzAirTrafficController.prototype.tripId = function() {
  return this.trips.length;
};

OrbitzAirTrafficController.prototype.origin = function() {
  return $('#airchgOrigin', this.doc)[0].value;
};
OrbitzAirTrafficController.prototype.destination = function() {
  return $('#airchgDestination', this.doc)[0].value;
};

OrbitzAirTrafficController.prototype.tripElements = function() {
  return $('.airResultsCard', this.doc);
};

OrbitzAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    $('.bookIt a', trip.tripElement).
      click(controller.events.purchase(controller, trip));
  });
};

module.exports = OrbitzAirTrafficController;
