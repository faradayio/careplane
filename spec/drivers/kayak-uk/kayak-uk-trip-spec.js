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
    this.trip = new KayakUKTrip(this.extension, '53', $('.flightresult').get(0));
  });

  itBehavesLikeA('Trip');
});
