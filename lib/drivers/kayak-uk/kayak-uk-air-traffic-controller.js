var AirTrafficController = require('../../air-traffic-controller'),
    AirTrafficControllerEvents = require('../../air-traffic-controller-events'),
    KayakAirTrafficController = require('../kayak/kayak-air-traffic-controller'),
    KayakUKTrip = require('./kayak-uk-trip');

var KayakUKAirTrafficController = function($, url) {
  this.$ = $;
  this.url = url;
  this.tripClass = KayakUKTrip;
  this.trips = [];
  this.tripCount = 0;
  this.completedTrips = 0;
};
KayakUKAirTrafficController.prototype = new KayakAirTrafficController();
KayakUKAirTrafficController.events = new AirTrafficControllerEvents();

module.exports = KayakUKAirTrafficController;
