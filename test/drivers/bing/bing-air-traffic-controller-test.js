var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var airTrafficControllerExamples = require('../../air-traffic-controller-examples');

var Bing = helper.plugin.require('./drivers/bing'),
    BingAirTrafficController = helper.plugin.require('./drivers/bing/bing-air-traffic-controller');

vows.describe('BingAirTrafficController').addBatch(
  airTrafficControllerExamples(BingAirTrafficController, 'bing_dtw_sfo.html', function($) {
    var controller = new BingAirTrafficController($);
    controller.searchData = JSON.parse(helper.readFixture('bing_dtw_sfo.json'));
    return controller;
  })
).addBatch({
  'with fixtures': {
    '#clear': {
      topic: function() {
        var $ = helper.qweryFixture('bing_dtw_sfo.html');
        var controller = new BingAirTrafficController($, '');
        return controller;
      },

      'loads searchData on first poll (when searchData is not yet set)': sinon.test(function(controller) {
        controller.searchData = null;
        this.spy(controller, 'fetchSearchData');
        controller.clear();
        sinon.assert.called(controller.fetchSearchData);
      }),
      'ignores empty searchData while waiting for AJAX': sinon.test(function(controller) {
        controller.searchData = [];
        this.spy(controller, 'fetchSearchData');
        this.spy(controller, 'discoverTrips');
        controller.clear();
        sinon.assert.notCalled(controller.fetchSearchData);
        sinon.assert.notCalled(controller.discoverTrips);
      }),
      'does the normal stuff once searchData is set': sinon.test(function(controller) {
        controller.searchData = JSON.parse(helper.readFixture('bing_dtw_sfo.json'));
        this.spy(controller, 'discoverTrips');
        this.spy(controller, 'scoreTrips');
        this.spy(controller, 'rateTrips');
        controller.clear();
        sinon.assert.called(controller.discoverTrips);
      })
    },

    '#findRequestId': {
      'finds a requestId hidden in one of the <a>s': function() {
        var $ = helper.qweryFixture('bing_dtw_sfo.html');
        var controller = new BingAirTrafficController($);
        assert.equal(controller.requestId(), 'caijs3i7m37c');
      }
    }
  },

  '#origin': {
    "returns the search's origin airport": function() {
      var controller = new BingAirTrafficController();
      controller.url = function() { return 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true'; };
      assert.equal(controller.origin(), 'DTW');
    }
  },
  '#destination': {
    "returns the search's origin airport": function() {
      var controller = new BingAirTrafficController();
      controller.url = function() { 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true'; };
      assert.equal(controller.destination(), 'SFO');
    }
  }
}).export(module);
