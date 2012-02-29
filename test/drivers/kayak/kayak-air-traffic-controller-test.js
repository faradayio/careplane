var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var KayakAirTrafficController = helper.plugin.require('./drivers/kayak/kayak-air-traffic-controller');

var airTrafficControllerExamples = require('../../air-traffic-controller-examples');

var fakeweb = require('fakeweb'),
    http = require('http');

http.register_intercept({
  uri: /\/s\/run\/inlineDetails\/flight.*searchid=VECBAtkvi/,
  host: 'www.kayak.com',
  body: JSON.stringify({ message: helper.kayakFlightDetails, status: 0 })
});

vows.describe('KayakAirTrafficController').addBatch(
  airTrafficControllerExamples(KayakAirTrafficController, 'kayak_dtw_sfo.html')
).addBatch({
  '#scoreTrips': {
    'scores standard flights': function() {
      http.register_intercept({
        uri: '/flights.json',
        host: 'impact.brighterplanet.com',
        body: JSON.stringify({ decisions: { carbon: { object: { value: 234 } } } })
      });

      var $ = helper.qweryFixture('kayak_dtw_sfo.html');
      var controller = new KayakAirTrafficController($);
      controller.discoverTrips();
      controller.scoreTrips();
      for(var i in controller.trips) {
        var p = controller.trips[i].footprintView.footprintParagraph();
        assert.match(p.text(), /[\d]+/);
      }

      http.clear_intercepts();
    }
  },

  '#origin': {
    "returns the search's origin airport": function() {
      var controller = new KayakAirTrafficController();
      controller.url = 'http://www.kayak.com/#flights/DTW-SFO/2011-05-05/2011-05-12';
      assert.equal(controller.origin(), 'DTW');
    }
  },
  '#destination': {
    "returns the search's origin airport": function() {
      var controller = new KayakAirTrafficController();
      controller.url = 'http://www.kayak.com/#flights/DTW-SFO/2011-05-05/2011-05-12';
      assert.equal(controller.destination(), 'SFO');
    }
  }
}).export(module);
