describe('HipmunkAirTrafficController', function() {
  beforeEach(function() {
    loadFixtures('hipmunk_dtw_sfo.html');
    this.controller = new HipmunkAirTrafficController(document);
  });

  itBehavesLikeAn('AirTrafficController');
});
