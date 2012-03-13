var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert;

var tripExamples = require('../../trip-examples');

var OrbitzTrip = helper.plugin.require('./drivers/orbitz/orbitz-trip');

var http = require('http'),
    fakeweb = require('fakeweb'),
    fs = require('fs'),
    path = require('path');

var orbitzFlightDetails = fs.readFileSync(path.resolve(__dirname, '../../fixtures/orbitz_dtw_sfo_flight_details.html'));
http.register_intercept({
  uri: /.*/,
  host: 'www.orbitz.com',
  body: orbitzFlightDetails
});

vows.describe('OrbitzTrip').addBatch(
  tripExamples('orbitz_dtw_sfo_result.html', function($) {
    return new OrbitzTrip(0, $, $('.airResultsCard').get(0));
  })
).addBatch({
  '#loadFlightsFromDetails': {
    'loads details for a United flight': function() {
      var $ = helper.qweryFixture('orbitz_dtw_sfo_united.html');
      var result = $('.airResultsCard').get(0);
      var trip = new OrbitzTrip(0, $, result);
      trip.flights = [];
      trip.loadFlightsFromDetails($(result), function() {});
      assert.equal(trip.flights.length, 4);
    } 
  }
}).export(module);
