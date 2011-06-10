HipmunkFlight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
};
HipmunkFlight.prototype = Flight.prototype;

HipmunkFlight.parse = function(leg) {
  var airline = $('.flightnum', leg).text();

  var airports = $('.place');
  var origin = $(airports[0]).text().match(/\(([^\)]+)\)/)[1];
  var destination = $(airports[1]).text().match(/\(([^\)]+)\)/)[1];

  var aircraft = $('.ridetype', leg).text();

  return new HipmunkFlight(origin, destination, airline, aircraft);
};
