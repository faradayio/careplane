BingFlight = function(origin, destination, airline) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
};
BingFlight.prototype = new Flight();

BingFlight.parse = function(legs) {
  var flights = [];
  for(var i = 0; i < legs.length; i++) {
    var leg = legs[i];
    flights.push(new BingFlight(leg.orig, leg.dest, leg.carrier));
  }

  return flights;
};
