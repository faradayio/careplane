describe('HipmunkFlight', function() {
  describe('.parse', function() {
    var flight;
    beforeEach(function() {
      loadFixtures('hipmunk_dtw_sfo_trip.html');
      flight = HipmunkFlight.parse($('.leg').get(0));
    });
    it('parses airline', function() {
      expect(flight.airline).toBe('United Airlines #7524')
    });
    it('parses origin', function() {
      expect(flight.origin).toBe('DTW')
    });
    it('parses destination', function() {
      expect(flight.destination).toBe('ORD')
    });
  });
});
