describe('BingAirTrafficController', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var Bing = require('drivers/bing');
  var BingAirTrafficController = require('drivers/bing/bing-air-traffic-controller');

  var bing;
  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    bing = new Bing(this.extension);
  });

  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('bing_dtw_sfo.html');
      this.controller = new BingAirTrafficController(bing, document);
      this.controller.searchData = JSON.parse(readFixtures('bing_dtw_sfo.json'));
    });

    itBehavesLikeAn('AirTrafficController');

    describe('#clear', function() {
      it('loads searchData on first poll (when searchData is not yet set)', function() {
        this.controller.searchData = null;
        spyOn(this.extension, 'fetch');
        this.controller.clear();
        expect(this.extension.fetch).toHaveBeenCalled();
      });
      it('ignores empty searchData while waiting for AJAX', function() {
        this.controller.searchData = [];
        spyOn(this.extension, 'fetch');
        spyOn(this.controller, 'discoverTrips');
        this.controller.clear();
        expect(this.extension.fetch).not.toHaveBeenCalled();
        expect(this.controller.discoverTrips).not.toHaveBeenCalled();
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

  describe('#origin', function() {
    it("returns the search's origin airport", function() {
      var controller = new BingAirTrafficController(bing, document);
      controller.url = 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true';
      expect(controller.origin()).toBe('DTW');
    });
  });
  describe('#destination', function() {
    it("returns the search's origin airport", function() {
      var controller = new BingAirTrafficController(bing, document);
      controller.url = 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true';
      expect(controller.destination()).toBe('SFO');
    });
  });

  describe('#findRequestId', function() {
    it('finds a requestId hidden in one of the <a>s', function() {
      loadFixtures('bing_dtw_sfo.html');
      var controller = new BingAirTrafficController(bing, document);
      expect(controller.requestId()).toBe('caijs3i7m37c');
    });
  });
});
