describe('KayakTrip', function() {
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.trip = new KayakTrip($('.inlineFlightDetailsLeg').get(0));
    TestExtension.urlMap['http://www.kayak.com/s/run/inlineDetails/flight'] = {
      'status': 0,
      'message': kayakFlightDetails
    };
  });

  itBehavesLikeA('Trip');

  describe('#flightIndices', function() {
    it('returns an array of tr indices which represent flights', function() {
      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var indices = this.trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');

      trs = $('.flightdetailstable').get(2).getElementsByTagName('tr');
      indices = this.trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');
    });
  });
});
