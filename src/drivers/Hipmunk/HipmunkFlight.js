HipmunkFlight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
};
HipmunkFlight.prototype = Flight.prototype;

HipmunkFlight.parse = function(leg) {
  var airline = $('b', leg).text();

  var facts = $('.facts:first', leg).text();
  var airportMatches = facts.match(/\([^\)]+\)/g);
  var origin = airportMatches[0].replace(/[\(\)]/g,'');
  var destination = airportMatches[1].replace(/[\(\)]/g,'');;

  var aircraft = $('.equipment:first', leg).text();

  return new HipmunkFlight(origin, destination, airline, aircraft);
};
