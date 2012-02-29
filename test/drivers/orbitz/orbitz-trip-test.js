var test = require('../../helper'),
    vows = test.vows;

var tripExamples = require('../../trip-examples');

var OrbitzTrip = test.plugin.require('./drivers/orbitz/orbitz-trip');

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
    return new OrbitzTrip(0, $('.airResultsCard').get(0));
  })
).export(module);
