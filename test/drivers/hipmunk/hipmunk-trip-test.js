var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon,
    jsonpath = require('dkastner-JSONPath');

var HipmunkTrip = helper.plugin.require('./drivers/hipmunk/hipmunk-trip');

var tripExamples = require('../../trip-examples');

var json = JSON.parse(helper.readFixture('hipmunk_dtw_sfo.json')),
    routing = jsonpath.eval(json, '$..routings[?(@.id=="r-0-7-dcaDnycOmay05Djun13")]')[0];

vows.describe('HipmunkTrip').addBatch(
  tripExamples('hipmunk_dtw_sfo.html', function($) {
    return new HipmunkTrip('r-0-0-dtwDsfoOmay05Djun13', $, $('.routing').get(0), routing);
  })
).addBatch({
  '#loadFlights': {
    'loads the appropriate flight information': function() {
      //var $ = helper.qweryFixture('hipmunk_dtw_sfo.html');
      var trip = new HipmunkTrip('r-0-0-dtwDsfoOmay05Djun13', null, null, routing);
      trip.loadFlights(function() {});

      assert.equal(trip.flights[0].origin, 'DTW');
      assert.equal(trip.flights[0].destination, 'DEN');
      assert.equal(trip.flights[1].origin, 'DEN');
      assert.equal(trip.flights[1].destination, 'SFO');
    }
  }
}).export(module);
