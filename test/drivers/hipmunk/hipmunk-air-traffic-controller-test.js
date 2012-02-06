var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

require('../../air-traffic-controller-examples');

vows.describe('HipmunkAirTrafficController').addBatch({
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var Hipmunk = require('drivers/hipmunk');
  var HipmunkAirTrafficController = require('drivers/hipmunk/hipmunk-air-traffic-controller');

  var hipmunk;
  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    hipmunk = new Hipmunk(this.extension);
  });

  'with fixtures': {
    beforeEach(function() {
      loadFixtures('hipmunk_dtw_sfo.html');
      this.controller = new HipmunkAirTrafficController(hipmunk, document);
      this.controller.url = 'www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
    });

    itBehavesLikeAn('AirTrafficController');
  });

  '#origin': {
    "returns the search's origin airport": function() {
      var controller = new HipmunkAirTrafficController(hipmunk, document);
      controller.url = 'http://www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
      expect(controller.origin()).toBe('DTW');
    });
  });
  '#destination': {
    "returns the search's origin airport": function() {
      var controller = new HipmunkAirTrafficController(hipmunk, document);
      controller.url = 'http://www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
      expect(controller.destination()).toBe('SFO');
    });
  });
});
