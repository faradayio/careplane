var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon,
    plugin = helper.plugin;

var AverageTrip = plugin.require('./average-trip');
var TripStatistics = plugin.require('./trip-statistics');

vows.describe('TripStatistics').addBatch({
  '.average': {
    topic: function() {
      trip = new AverageTrip('ORD', 'SEA', 143.5);
      trip.totalFootprint = 143.5;
      TripStatistics.averages = [trip];
      return trip;
    },

    'looks up an average trip based on origin and destination': function() {
      sinon.spy(TripStatistics,'scoreAverage');
      var avg = TripStatistics.average('ORD','PDX', function() { });
      assert.called(TripStatistics.scoreAverage);
    },
    'fetches cached averages': function() {
      spyOn(TripStatistics,'scoreAverage');
      var avg = TripStatistics.average('ORD','SEA', function() { });
      assert.notCalled(TripStatistics.scoreAverage);
    },
    'provides the average trip to the callback': function(trip) {
      var result;
      var avg = TripStatistics.average('ORD','SEA', function(average) { result = average; });
      assert.equal(result, trip);
    }
  }
}).export(module);
