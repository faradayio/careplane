describe('KayakAirTrafficController', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var Kayak = require('drivers/kayak');
  var KayakAirTrafficController = require('drivers/kayak/kayak-air-traffic-controller');

  var kayak;
  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    this.extension.urlMap['http://www.kayak.com/s/run/inlineDetails/flight.*'] = {
      'status': 0,
      'message': kayakFlightDetails
    };
    kayak = new Kayak(this.extension);
  });

  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo.html');
      this.controller = new KayakAirTrafficController(kayak, document);
    });

    itBehavesLikeAn('AirTrafficController');
  });

  describe('#scoreTrips', function() {
    it('scores standard flights', function() {
      this.extension.urlMap['carbon.brighterplanet.com/flights'] = "{ \"emission\": 234 }"
      loadFixtures('kayak_dtw_sfo_flight.html');
      var controller = new KayakAirTrafficController(kayak, document);
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
      var controller = new KayakAirTrafficController(kayak, document);
      controller.url = 'http://www.kayak.com/#flights/DTW-SFO/2011-05-05/2011-05-12';
      expect(controller.origin()).toBe('DTW');
    });
  });
  describe('#destination', function() {
    it("returns the search's origin airport", function() {
      var controller = new KayakAirTrafficController(kayak, document);
      controller.url = 'http://www.kayak.com/#flights/DTW-SFO/2011-05-05/2011-05-12';
      expect(controller.destination()).toBe('SFO');
    });
  });
});
