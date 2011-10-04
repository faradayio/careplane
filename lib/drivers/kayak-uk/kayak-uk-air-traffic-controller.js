var AirTrafficController = require('../../air-traffic-controller');
var AirTrafficControllerEvents = require('../../air-traffic-controller-events');
var KayakAirTrafficController = require('../kayak/kayak-air-traffic-controller');
var KayakUKTrip = require('./kayak-uk-trip');

var KayakUKAirTrafficController = function(driver, doc) {
  this.driver = driver;
  this.doc = doc;
  this.url = doc ? this.doc.location.href : null;
  this.tripClass = KayakUKTrip;
  this.trips = [];
  this.tripCount = 0;
  this.completedTrips = 0;
};
KayakUKAirTrafficController.prototype = new KayakAirTrafficController();
KayakUKAirTrafficController.events = new AirTrafficControllerEvents();

module.exports = KayakUKAirTrafficController;
