describe('OrbitzFlight', function() {
  describe('.parse', function() {
    it('parses an Orbitz leg', function() {
      loadFixtures('orbitz_dtw_sfo_result.html');
      var node = $('.resultLeg').get(0);

      var flight = OrbitzFlight.parse({}, node);
      expect(flight.origin).toBe('DTW');
      expect(flight.destination).toBe('SFO');
      expect(flight.airline).toBe('Delta Air Lines');
      expect(flight.aircraft).toBe('Boeing 737');
    });
  });
});
