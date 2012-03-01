var Flight = require('../../flight');

var OrbitzFlight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
};
OrbitzFlight.prototype = new Flight();

OrbitzFlight.parse = function($, legElement) {
  var airCodes = $('.airportCode', legElement);
  var origin = $(airCodes.get(0)).text().match(/[A-Za-z]+/)[0];
  var destination = $(airCodes.get(1)).text().match(/[A-Za-z]+/)[0];

  var airline = $('.flightNameAndNumber', legElement).text();
  airline = airline.replace(/[\n\r\t]+/,'');
  airline = airline.replace(/[\s]+$/,'');
  airline = airline.replace(/^[\s]+/,'');
  airline = airline.replace('&nbsp;','');
  airline = airline.replace(/\d+$/,'');
  airline = $.trim(airline);

  var aircraft = $('.aircraft', legElement).text();

  return new OrbitzFlight(origin, destination, airline, aircraft);
};

module.exports = OrbitzFlight;
