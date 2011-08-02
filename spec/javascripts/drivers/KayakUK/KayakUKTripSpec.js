describe('KayakUKTrip', function() {
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.trip = new KayakUKTrip('53', $('.flightresult').get(0));
    TestExtension.urlMap['http://www.kayak.co.uk/s/run/inlineDetails/flight'] = {
      'status': 0,
      'message': kayakFlightDetails
    };
  });

  itBehavesLikeA('Trip');
});
