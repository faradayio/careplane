require('../../helpers/spec-helper');
require('../../trip-examples');

var fakeweb = require('fakeweb');
var http = require('http');

describe('KayakTrip', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var KayakTrip = require('drivers/kayak/kayak-trip');

  beforeEach(function() {
    http.register_intercept({
      uri: /\/s\/run\/inlineDetails\/flight/,
      host: 'www.kayak.com',
      body: JSON.stringify({ message: kayakFlightDetails })
    });
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.trip = new KayakTrip('1050', $('.flightresult').get(0));
    this.trip.init();
  });

  afterEach(function() { http.clear_intercepts(); });

  itBehavesLikeA('Trip');
});
