var AirTrafficController = require('../../AirTrafficController');
var KayakAirTrafficController = require('../Kayak/KayakAirTrafficController');
var KayakUKTrip = require('./KayakUKTrip');

KayakUKAirTrafficController = function(driver, doc) {
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
