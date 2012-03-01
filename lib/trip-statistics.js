var AverageTrip = require('./average-trip');

var TripStatistics = {
  averages: [],
  average: function(origin, destination, callback) {
    var trip = Array.prototype.filter.call(this.averages, function(trip) {
      return trip.origin() == origin && trip.destination() == destination;
    });
    if(trip.length > 0) {
      callback(trip[0]);
    } else {
      this.scoreAverage(origin, destination, callback);
    }
  },
  scoreAverage: function(origin, destination, callback) {
    var trip = new AverageTrip(origin, destination);
    this.averages.push(trip);
    trip.score(function() {}, callback);
  }
};

module.exports = TripStatistics;
