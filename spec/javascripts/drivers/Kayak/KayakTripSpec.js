describe('KayakTrip', function() {
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.trip = new KayakTrip($('.flightresult').get(0));
    TestExtension.urlMap['http://www.kayak.com/s/run/inlineDetails/flight'] = {
      'status': 0,
      'message': kayakFlightDetails
    };
  });

  itBehavesLikeA('Trip');
});
