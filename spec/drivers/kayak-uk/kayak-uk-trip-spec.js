require('../../helpers/spec-helper');
require('../../trip-examples');

var fakeweb = require('fakeweb'),
    http = require('http');

describe('KayakUkTrip', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var KayakUKTrip = require('drivers/kayak-uk/kayak-uk-trip');

  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    http.register_intercept({
      uri: /\/s\/run\/inlineDetails\/flight.*/,
      host: 'www.kayak.co.uk',
      body: JSON.stringify({ message: kayakFlightDetails })
    });
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.trip = new KayakUKTrip('818', $('.flightresult').get(0));
    this.trip.init();
  });

  afterEach(function() { http.clear_intercepts(); });

  itBehavesLikeA('Trip');
});
