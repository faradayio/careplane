describe('Kayak', function() {
  describe('.scoreFlights', function() {
    it('sets a score for each flight', function() {
      loadFixtures('kayak_dtw_sfo.html');
      Kayak.scoreFlights(document);
    });
  });
});
