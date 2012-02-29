var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var KayakUKAirTrafficController = helper.plugin.require('./drivers/kayak-uk/kayak-uk-air-traffic-controller');

var airTrafficControllerExamples = require('../../air-traffic-controller-examples');

var fakeweb = require('fakeweb'),
    http = require('http');

http.register_intercept({
  uri: /\/s\/run\/inlineDetails\/flight.*/,
  host: 'www.kayak.co.uk',
  body: JSON.stringify({ message: helper.kayakFlightDetails })
});

vows.describe('KayakUkAirTrafficController').addBatch(
  airTrafficControllerExamples(KayakUKAirTrafficController, 'kayak_uk_lhr_txl.html')
).addBatch({
  '#scoreTrips': {
    'scores standard flights': function() {
      http.register_intercept({
        uri: '/flights.json',
        host: 'impact.brighterplanet.com',
        body: JSON.stringify({ decisions: { carbon: { object: { value: 234 }}}})
      });

      var $ = qweryFixture('kayak_uk_lhr_txl_flight.html');
      var controller = new KayakUKAirTrafficController($);
      controller.discoverTrips();
      controller.scoreTrips();
      for(var i in controller.trips) {
        var p = controller.trips[i].footprintView.footprintParagraph();
        expect(p).toHaveText(/[\d]+/);
      }

      http.clear_intercepts();
    }
  },

  '#origin': {
    "returns the search's origin airport": function() {
      var controller = new KayakUKAirTrafficController();
      controller.url = 'http://www.kayak.co.uk/#flights/DTW-SFO/2011-05-05/2011-05-12';
      assert.equal(controller.origin(), 'DTW');
    }
  },
  '#destination': {
    "returns the search's origin airport": function() {
      var controller = new KayakUKAirTrafficController();
      controller.url = 'http://www.kayak.co.uk/#flights/DTW-SFO/2011-05-05/2011-05-12';
      assert.equal(controller.destination(), 'SFO');
    }
  }
}).export(module);
