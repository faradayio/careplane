describe('HipmunkAirTrafficController', function() {
  var JasmineExtension = require('browser/jasmine/JasmineExtension');
  var Hipmunk = require('drivers/Hipmunk');
  var HipmunkAirTrafficController = require('drivers/Hipmunk/HipmunkAirTrafficController');

  var hipmunk;
  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    hipmunk = new Hipmunk(this.extension);
  });

  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('hipmunk_dtw_sfo.html');
      this.controller = new HipmunkAirTrafficController(hipmunk, document);
      this.controller.url = 'www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
    });

    itBehavesLikeAn('AirTrafficController');
  });

  describe('#origin', function() {
    it("returns the search's origin airport", function() {
      var controller = new HipmunkAirTrafficController(hipmunk, document);
      controller.url = 'http://www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
      expect(controller.origin()).toBe('DTW');
    });
  });
  describe('#destination', function() {
    it("returns the search's origin airport", function() {
      var controller = new HipmunkAirTrafficController(hipmunk, document);
      controller.url = 'http://www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
      expect(controller.destination()).toBe('SFO');
    });
  });
});
