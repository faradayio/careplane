var AirTrafficController = require('../../air-traffic-controller');
var OrbitzTrip = require('./orbitz-trip');
var OrbitzAirTrafficControllerEvents = require('./orbitz-air-traffic-controller-events');

var OrbitzAirTrafficController = function($) {
  this.$ = $;
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

OrbitzAirTrafficController.prototype.tripElements = function() {
  return this.$('.airResultsCard');
};

OrbitzAirTrafficController.prototype.origin = function() {
  return this.$('#airchgOrigin')[0].value;
};
OrbitzAirTrafficController.prototype.destination = function() {
  return this.$('#airchgDestination')[0].value;
};

OrbitzAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    controller.$('.bookIt a', trip.tripElement).
      click(controller.events.purchase(controller, trip));
  });
};

module.exports = OrbitzAirTrafficController;
