describe('OrbitzAirTrafficController', function() {
  beforeEach(function() {
    this.controller = null;
    loadFixtures('orbitz_dtw_sfo.html');
    this.controller = new OrbitzAirTrafficController(document);
  });

  itBehavesLikeAn('AirTrafficController');
});
