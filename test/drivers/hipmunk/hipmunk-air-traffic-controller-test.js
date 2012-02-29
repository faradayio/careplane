var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert;

var HipmunkAirTrafficController = helper.plugin.require('./drivers/hipmunk/hipmunk-air-traffic-controller');

var airTrafficControllerExamples = require('../../air-traffic-controller-examples');

vows.describe('HipmunkAirTrafficController').addBatch(
  airTrafficControllerExamples(HipmunkAirTrafficController, 'hipmunk_dtw_sfo.html')
).addBatch({
  '#origin': {
    "returns the search's origin airport": function() {
      var controller = new HipmunkAirTrafficController();
      controller.url = 'http://www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
      assert.equal(controller.origin(), 'DTW');
    }
  },
  '#destination': {
    "returns the search's origin airport": function() {
      var controller = new HipmunkAirTrafficController();
      controller.url = 'http://www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
      assert.equal(controller.destination(), 'SFO');
    }
  }
}).export(module);
