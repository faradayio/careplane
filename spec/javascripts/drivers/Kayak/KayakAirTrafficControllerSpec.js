describe('KayakAirTrafficController', function() {
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo.html');
    this.controller = new KayakAirTrafficController(document);
  });

  itBehavesLikeAn('AirTrafficController');

  describe('#scoreTrips', function() {
    it('scores redeye flights', function() {
      jasmine.getFixtures().cleanUp(); // unload fixtures
      loadFixtures('kayak_dtw_sfo_redeye.html');
      this.controller.discoverTrips();
      this.controller.scoreTrips();
      for(var i in this.controller.trips) {
        var p = this.controller.trips[i].footprintView().footprintParagraph();
        expect(p.innerHTML).toMatch(/[\d]+/);
      }
    });
  });
});
