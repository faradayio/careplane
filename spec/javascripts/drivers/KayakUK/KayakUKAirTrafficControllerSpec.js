describe('KayakUKAirTrafficController', function() {
  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('kayak_uk_lhr_txl.html');
      TestExtension.urlMap['http://www.kayak.co.uk/s/run/inlineDetails/flight.*'] = {
        'status': 0,
        'message': kayakFlightDetails
      };
      this.controller = new KayakUKAirTrafficController(document);
    });

    itBehavesLikeAn('AirTrafficController');
  });

  describe('#scoreTrips', function() {
    it('scores standard flights', function() {
      TestExtension.urlMap['carbon.brighterplanet.com/flights'] = "{ \"emission\": 234 }"
      loadFixtures('kayak_uk_lhr_txl_flight.html');
      var controller = new KayakUKAirTrafficController(document);
      controller.discoverTrips();
      controller.scoreTrips();
      for(var i in controller.trips) {
        var p = controller.trips[i].footprintView.footprintParagraph();
        expect(p).toHaveText(/[\d]+/);
      }
    });
  });

  describe('#origin', function() {
    it("returns the search's origin airport", function() {
      var controller = new KayakUKAirTrafficController(document);
      controller.url = 'http://www.kayak.co.uk/#flights/DTW-SFO/2011-05-05/2011-05-12';
      expect(controller.origin()).toBe('DTW');
    });
  });
  describe('#destination', function() {
    it("returns the search's origin airport", function() {
      var controller = new KayakUKAirTrafficController(document);
      controller.url = 'http://www.kayak.co.uk/#flights/DTW-SFO/2011-05-05/2011-05-12';
      expect(controller.destination()).toBe('SFO');
    });
  });
});
