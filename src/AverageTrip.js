AverageTrip = function(origin, destination) {
  this.origin = origin;
  this.destination = destination;
  this.flight = new Flight(origin, destination);
  this.flight.segments_per_trip = null;
  this.flight.trips = null;
};
AverageTrip.prototype = new Trip();

AverageTrip.prototype.flights = function() { return [this.flight] };
