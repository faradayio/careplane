describe('HipmunkAirTrafficController', function() {
  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('hipmunk_dtw_sfo.html');
      this.controller = HipmunkAirTrafficController.create(document);
      this.controller.url = 'www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
    });

    itBehavesLikeAn('AirTrafficController');
  });

  describe('#origin', function() {
    it("returns the search's origin airport", function() {
      var controller = new HipmunkAirTrafficController(document);
      controller.url = 'http://www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
      expect(controller.origin()).toBe('DTW');
    });
  });
  describe('#destination', function() {
    it("returns the search's origin airport", function() {
      var controller = new HipmunkAirTrafficController(document);
      controller.url = 'http://www.hipmunk.com/results?to=sfo&s=srchn0ifqs7&from=dtw';
      expect(controller.destination()).toBe('SFO');
    });
  });
});
