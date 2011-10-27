require('../../helpers/spec-helper');
require('../../air-traffic-controller-examples');

var fakeweb = require('fakeweb'),
    http = require('http');

describe('KayakAirTrafficController', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var Kayak = require('drivers/kayak');
  var KayakAirTrafficController = require('drivers/kayak/kayak-air-traffic-controller');

  var kayak;
  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    kayak = new Kayak(this.extension);

    http.register_intercept({
      uri: /\/s\/run\/inlineDetails\/flight.*searchid=VECBAtkvi/,
      host: 'www.kayak.com',
      body: JSON.stringify({ message: kayakFlightDetails, status: 0 })
    });
  });

  afterEach(function() { http.clear_intercepts(); });

  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo.html');
      this.controller = new KayakAirTrafficController(kayak, document);
    });

    itBehavesLikeAn('AirTrafficController');
  });

  describe('#scoreTrips', function() {
    it('scores standard flights', function() {
      http.register_intercept({
        uri: '/flights.json',
        host: 'impact.brighterplanet.com',
        body: JSON.stringify({ decisions: { carbon: { object: { value: 234 } } } })
      });

      loadFixtures('kayak_dtw_sfo_flight.html');
      var controller = new KayakAirTrafficController(kayak, document);
      controller.discoverTrips();
      controller.scoreTrips();
      for(var i in controller.trips) {
        var p = controller.trips[i].footprintView.footprintParagraph();
        expect(p).toHaveText(/[\d]+/);
      }

      http.clear_intercepts();
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
