describe('KayakAirTrafficController', function() {
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo.html');
    this.controller = new KayakAirTrafficController(document);
  });

  itBehavesLikeAn('AirTrafficController');

  describe('#clear', function() {
    it('scores one-way trips', function() {
      this.controller.clear();
      expect(this.controller.trips.length).toBe(15);
      for(var i in this.controller.trips) {
        var p = this.controller.trips[i].footprintView().footprintParagraph;
        expect(p.innerHTML).toMatch(/[\d]+/);
        expect(p.style.color).toMatch(/rgb/);
      }
    });
  });

  describe('#scoreTrips', function() {
    it('parses redeye flights', function() {
      jasmine.getFixtures().cleanUp(); // unload fixtures
      loadFixtures('kayak_dtw_sfo_redeye.html');
      this.controller.scoreTrips();
      expect($('.careplane-footprint')).toHaveText(/\d+/)
    });
  });
});
