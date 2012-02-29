var test = require('../../helper'),
    vows = test.vows;

var tripExamples = require('../../trip-examples');

var KayakTrip = test.plugin.require('./drivers/kayak/kayak-trip');

var http = require('http'),
    fakeweb = require('fakeweb');

http.register_intercept({
  uri: /\/s\/run\/inlineDetails\/flight/,
  host: 'www.kayak.com',
  body: JSON.stringify({ message: test.kayakFlightDetails })
});

vows.describe('KayakTrip').addBatch(
  tripExamples('kayak_dtw_sfo_flight.html', function($) {
    return new KayakTrip('1050', $, $('.flightresult').get(0));
  })
).export(module);
