describe('KayakAirTrafficController', function() {
  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo.html');
      this.controller = new KayakAirTrafficController(document);
    });

    itBehavesLikeAn('AirTrafficController');
  });

  describe('#scoreTrips', function() {
    it('scores redeye flights', function() {
      TestExtension.urlMap['carbon.brighterplanet.com/flights'] = "{ \"emission\": 234 }"
      loadFixtures('kayak_dtw_sfo_redeye.html');
      var controller = new KayakAirTrafficController(document);
      controller.discoverTrips();
      controller.scoreTrips();
      for(var i in controller.trips) {
        var p = controller.trips[i].footprintView().footprintParagraph();
        expect(p.innerHTML).toMatch(/[\d]+/);
      }
    });
  });

  describe('#origin', function() {
    it("returns the search's origin airport", function() {
      var controller = new KayakAirTrafficController(document);
      controller.url = 'http://www.kayak.com/#flights/DTW-SFO/2011-05-05/2011-05-12';
      expect(controller.origin()).toBe('DTW');
    });
  });
  describe('#destination', function() {
    it("returns the search's origin airport", function() {
      var controller = new KayakAirTrafficController(document);
      controller.url = 'http://www.kayak.com/#flights/DTW-SFO/2011-05-05/2011-05-12';
      expect(controller.destination()).toBe('SFO');
    });
  });
});
