describe('OrbitzAirTrafficController', function() {
  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo.html');
    this.controller = new OrbitzAirTrafficController(document);
  });

  itBehavesLikeAn('AirTrafficController');

  describe('#minCost', function() {
    it('returns the minimum cost amount', function() {
      expect(this.controller.minCost()).toBe(301);
    });
  });
});
