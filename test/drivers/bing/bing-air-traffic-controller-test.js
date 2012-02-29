var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var airTrafficControllerExamples = require('../../air-traffic-controller-examples');

var Bing = helper.plugin.require('./drivers/bing');
var BingAirTrafficController = helper.plugin.require('./drivers/bing/bing-air-traffic-controller');

vows.describe('BingAirTrafficController').addBatch(
  airTrafficControllerExamples(BingAirTrafficController, 'bing_dtw_sfo.html')
).addBatch({
  'with fixtures': {
    topic: function() {
      test.qweryFixture('bing_dtw_sfo.html', function(err, $) {
        var controller = new BingAirTrafficController($, '');
        controller.searchData = JSON.parse(readFixtures('bing_dtw_sfo.json'));
      });
    },

    '#clear': {
      'loads searchData on first poll (when searchData is not yet set)': function(controller) {
        controller.searchData = null;
        sinon.spy(controller, 'fetchSearchData');
        controller.clear();
        assert.called(controller.fetchSearchData);
      },
      'ignores empty searchData while waiting for AJAX': function(controller) {
        controller.searchData = [];
        spyOn(controller, 'fetchSearchData');
        spyOn(controller, 'discoverTrips');
        controller.clear();
        expect(controller.fetchSearchData).not.toHaveBeenCalled();
        expect(controller.discoverTrips).not.toHaveBeenCalled();
      },
      'does the normal stuff once searchData is set': function(controller) {
        spyOn(controller, 'discoverTrips');
        spyOn(controller, 'scoreTrips');
        spyOn(controller, 'rateTrips');
        controller.clear();
        expect(controller.discoverTrips).toHaveBeenCalled();
      }
    },

    '#findRequestId': {
      'finds a requestId hidden in one of the <a>s': function() {
        loadFixtures('bing_dtw_sfo.html');
        var controller = new BingAirTrafficController(bing, document);
        expect(controller.requestId()).toBe('caijs3i7m37c');
      }
    }
  },

  '#origin': {
    "returns the search's origin airport": function() {
      var controller = new BingAirTrafficController(bing, document);
      controller.url = 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true';
      expect(controller.origin()).toBe('DTW');
    }
  },
  '#destination': {
    "returns the search's origin airport": function() {
      var controller = new BingAirTrafficController(bing, document);
      controller.url = 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true';
      expect(controller.destination()).toBe('SFO');
    }
  }
}).export(module);
