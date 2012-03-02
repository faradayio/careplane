var Flight = require('../../flight');

var HipmunkFlight = function(origin, destination, airline, aircraft, seatClass) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
  this.seatClass = seatClass;
};
HipmunkFlight.prototype = new Flight();

module.exports = HipmunkFlight;
