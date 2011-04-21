HipmunkFlight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
};
HipmunkFlight.prototype = Flight.prototype;

HipmunkFlight.parse = function(leg) {
  var airline = leg.getElementsByTagName('b')[0].innerText;

  var facts = leg.getElementsByClassName('facts')[0].innerText;
  var airportMatches = facts.match(/\([^\)]+\)/g);

  var origin = airportMatches[0].replace(/[\(\)]/g,'');
  var destination = airportMatches[1].replace(/[\(\)]/g,'');;
  var aircraft = leg.getElementsByClassName('equipment')[0].innerText;

  return new HipmunkFlight(origin, destination, airline, aircraft);
};
