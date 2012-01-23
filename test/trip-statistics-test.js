require('./helper');

vows.describe('TripStatistics').addBatch({
  var AverageTrip = require('average-trip');
  var TripStatistics = require('trip-statistics');

  '.average': {
    var trip;
    beforeEach(function() {
      trip = new AverageTrip('ORD', 'SEA', 143.5);
      trip.totalFootprint = 143.5;
      TripStatistics.averages = [trip];
    });

    'looks up an average trip based on origin and destination': function() {
      spyOn(TripStatistics,'scoreAverage');
      var avg = TripStatistics.average('ORD','PDX', function() { });
      expect(TripStatistics.scoreAverage).toHaveBeenCalled();
    });
    'fetches cached averages': function() {
      spyOn(TripStatistics,'scoreAverage');
      var avg = TripStatistics.average('ORD','SEA', function() { });
      expect(TripStatistics.scoreAverage).not.toHaveBeenCalled();
    });
    'provides the average trip to the callback': function() {
      var result;
      var avg = TripStatistics.average('ORD','SEA', function(average) { result = average; });
      expect(result).toEqual(trip);
    });
  });
});
