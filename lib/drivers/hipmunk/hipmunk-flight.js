var $ = require('jquery');
var Flight = require('../../flight');

var HipmunkFlight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
};
HipmunkFlight.prototype = new Flight();

HipmunkFlight.parse = function(leg) {
  var airline = $('.flightnum', leg).text();
  if(/Major/.test(airline) || /Mystery/.test(airline))
    airline = null;

  var airports = $('.place', leg);
  var origin = $(airports[0]).text().match(/\(([^\)]+)\)/)[1];
  var destination = $(airports[1]).text().match(/\(([^\)]+)\)/)[1];

  var aircraft = $('.ridetype a', leg).text();
  if(/Mystery/.test(aircraft))
    aircraft = null;

  return new HipmunkFlight(origin, destination, airline, aircraft);
};

module.exports = HipmunkFlight;
