AverageTrip = function(origin, destination) {
  this._origin = origin;
  this._destination = destination;
  this.flight = new Flight(origin, destination);
  this.flight.segments_per_trip = null;
  this.flight.trips = null;
};
AverageTrip.prototype = new Trip();

AverageTrip.prototype.origin = function() { return this._origin };
AverageTrip.prototype.destination = function() { return this._destination };

AverageTrip.prototype.flights = function() { return [this.flight]; };
