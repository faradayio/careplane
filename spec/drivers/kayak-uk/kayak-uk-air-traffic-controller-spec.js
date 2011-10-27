require('../../air-traffic-controller-examples');
var fakeweb = require('fakeweb'),
    http = require('http');

describe('KayakUkAirTrafficController', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var KayakUK = require('drivers/kayak-uk');
  var KayakUKAirTrafficController = require('drivers/kayak-uk/kayak-uk-air-traffic-controller');

  var kayakuk;
  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    http.register_intercept({
      uri: /\/s\/run\/inlineDetails\/flight.*/,
      host: 'www.kayak.co.uk',
      body: JSON.stringify({ message: kayakFlightDetails })
    });
    kayakuk = new KayakUK(this.extension, document);
  });

  afterEach(function() { http.clear_intercepts(); });

  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('kayak_uk_lhr_txl.html');
      this.controller = new KayakUKAirTrafficController(kayakuk, document);
    });

    itBehavesLikeAn('AirTrafficController');
  });

  describe('#scoreTrips', function() {
    it('scores standard flights', function() {
      http.register_intercept({
        uri: '/flights.json',
        host: 'impact.brighterplanet.com',
        body: JSON.stringify({ decisions: { carbon: { object: { value: 234 }}}})
      });

      loadFixtures('kayak_uk_lhr_txl_flight.html');
      var controller = new KayakUKAirTrafficController(kayakuk, document);
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
      var controller = new KayakUKAirTrafficController(kayakuk, document);
      controller.url = 'http://www.kayak.co.uk/#flights/DTW-SFO/2011-05-05/2011-05-12';
      expect(controller.origin()).toBe('DTW');
    });
  });
  describe('#destination', function() {
    it("returns the search's origin airport", function() {
      var controller = new KayakUKAirTrafficController(kayakuk, document);
      controller.url = 'http://www.kayak.co.uk/#flights/DTW-SFO/2011-05-05/2011-05-12';
      expect(controller.destination()).toBe('SFO');
    });
  });
});
