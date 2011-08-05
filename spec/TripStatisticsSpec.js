describe('TripStatistics', function() {
  var TestExtension = require('browser/test/TestExtension');
  var AverageTrip = require('AverageTrip');
  var TripStatistics = require('TripStatistics');

  describe('.average', function() {
    var trip, extension;
    beforeEach(function() {
      extension = new TestExtension(document);
      trip = new AverageTrip(extension, 'ORD', 'SEA', 143.5);
      trip.totalFootprint = 143.5;
      TripStatistics.averages = [trip];
    });

    it('looks up an average trip based on origin and destination', function() {
      spyOn(extension,'fetch');
      var avg = TripStatistics.average(extension, 'ORD','PDX', function() { });
      expect(extension.fetch).toHaveBeenCalled();
    });
    it('fetches cached averages', function() {
      spyOn(extension,'fetch');
      var avg = TripStatistics.average(extension, 'ORD','SEA', function() { });
      expect(extension.fetch).not.toHaveBeenCalled();
    });
    it('provides the average trip to the callback', function() {
      var result;
      var avg = TripStatistics.average(extension, 'ORD','SEA', function(average) { result = average; });
      expect(result).toEqual(trip);
    });
  });
});
