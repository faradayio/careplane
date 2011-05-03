describe('HipmunkAirTrafficController', function() {
  describe('with fixtures', function() {
    beforeEach(function() {
      loadFixtures('hipmunk_dtw_sfo.html');
      this.controller = new HipmunkAirTrafficController(document);
      this.controller.url = 'http://www.kayak.com/#flights/DTW-SFO/2011-05-05/2011-05-12';
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
