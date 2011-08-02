describe('BingAirTrafficController', function() {
  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('bing_dtw_sfo.html');
      this.controller = new BingAirTrafficController(document);
      this.controller.searchData = JSON.parse(readFixtures('bing_dtw_sfo.json'));
    });

    itBehavesLikeAn('AirTrafficController');

    describe('#clear', function() {
      it('loads searchData on first poll (when searchData is not yet set)', function() {
        this.controller.searchData = null;
        spyOn(Careplane, 'fetch');
        this.controller.clear();
        expect(Careplane.fetch).toHaveBeenCalled();
      });
      it('does the normal stuff once searchData is set', function() {
        spyOn(this.controller, 'discoverTrips');
        spyOn(this.controller, 'scoreTrips');
        spyOn(this.controller, 'rateTrips');
        this.controller.clear();
        expect(this.controller.discoverTrips).toHaveBeenCalled();
      });
    });
  });

  describe('#scoreTrips', function() {
    it('scores standard flights', function() {
      TestExtension.urlMap['carbon.brighterplanet.com/flights'] = "{ \"emission\": 234 }"
      loadFixtures('bing_dtw_sfo_flight.html');
      var controller = new BingAirTrafficController(document);
      controller.searchData = JSON.parse(readFixtures('bing_dtw_sfo.json'));
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
      var controller = new BingAirTrafficController(document);
      controller.url = 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true';
      expect(controller.origin()).toBe('DTW');
    });
  });
  describe('#destination', function() {
    it("returns the search's origin airport", function() {
      var controller = new BingAirTrafficController(document);
      controller.url = 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true';
      expect(controller.destination()).toBe('SFO');
    });
  });

  describe('#findRequestId', function() {
    it('finds a requestId hidden in one of the <a>s', function() {
      loadFixtures('bing_dtw_sfo.html');
      var controller = new BingAirTrafficController(document);
      expect(controller.findRequestId()).toBe('-fykf2xemsqxq');
    });
  });
});
