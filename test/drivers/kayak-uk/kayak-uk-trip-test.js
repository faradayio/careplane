var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var KayakUKTrip = helper.plugin.require('./drivers/kayak-uk/kayak-uk-trip');

var tripExamples = require('../../trip-examples');

var fakeweb = require('fakeweb'),
    http = require('http');

http.register_intercept({
  uri: /\/s\/run\/inlineDetails\/flight.*/,
  host: 'www.kayak.co.uk',
  body: JSON.stringify({ message: helper.kayakFlightDetails })
});

vows.describe('KayakUkTrip').addBatch(
  tripExamples('kayak_dtw_sfo_flight.html', function($) {
    var trip = new KayakUKTrip('818', $, $('.flightresult').get(0));
    trip.init();
    return trip;
  })
).export(module);
