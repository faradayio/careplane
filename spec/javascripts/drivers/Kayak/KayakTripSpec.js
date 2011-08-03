describe('KayakTrip', function() {
  beforeEach(function() {
    this.extension = new TestExtension(document);
    this.extension.urlMap['http://www.kayak.com/s/run/inlineDetails/flight'] = {
      'status': 0,
      'message': kayakFlightDetails
    };
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.trip = new KayakTrip(this.extension, '53', $('.flightresult').get(0));
  });

  itBehavesLikeA('Trip');
});
