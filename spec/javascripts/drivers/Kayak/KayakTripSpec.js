describe('KayakTrip', function() {
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo_direct_flight.html');
    this.trip = new KayakTrip($('.flightresult').get(0));
  });

  itBehavesLikeA('Trip');

  describe('#flightIndices', function() {
    it('returns an array of tr indices which represent flights', function() {
      var trip = new KayakTrip(document);

      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var indices = trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');

      trs = $('.flightdetailstable').get(2).getElementsByTagName('tr');
      indices = trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');
    });
    it('gracefully handles redeyes', function() {
      loadFixtures('kayak_dtw_sfo_redeye.html');
      var trip = new KayakTrip(document);

      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var indices = trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');

      trs = $('.flightdetailstable').get(2).getElementsByTagName('tr');
      indices = trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('2');
      expect(indices[1]).toBe('5');
    });
  });
});
