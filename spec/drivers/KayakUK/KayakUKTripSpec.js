describe('KayakUKTrip', function() {
  var JasmineExtension = require('browser/jasmine/JasmineExtension');
  var KayakUKTrip = require('drivers/KayakUK/KayakUKTrip');

  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    this.extension.urlMap['http://www.kayak.co.uk/s/run/inlineDetails/flight'] = {
      'status': 0,
      'message': kayakFlightDetails
    };
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.trip = new KayakUKTrip(this.extension, '53', $('.flightresult').get(0));
  });

  itBehavesLikeA('Trip');
});
