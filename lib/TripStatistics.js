var AverageTrip = require('./AverageTrip');

var TripStatistics = {
  averages: [],
  average: function(extension, origin, destination, callback) {
    var trip = Array.prototype.filter.call(this.averages, function(trip) {
      return trip.origin() == origin && trip.destination() == destination;
    });
    if(trip.length > 0) {
      callback(trip[0]);
    } else {
      trip = new AverageTrip(extension, origin, destination);
      this.averages.push(trip);
      trip.score(function() {}, callback);
    }
  }
};

module.exports = TripStatistics;
