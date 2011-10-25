describe('KayakTrip', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var KayakTrip = require('drivers/kayak/kayak-trip');

  beforeEach(function() {
    fakeweb.allowNetConnect = false;
    fakeweb.registerUri({
      uri: 'http://www.kayak.com/s/run/inlineDetails/flight',
      body: JSON.stringify(kayakFlightDetails)
    });
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.trip = new KayakTrip('53', $('.flightresult').get(0));
  });

  itBehavesLikeA('Trip');
});
