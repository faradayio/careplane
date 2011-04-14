describe('OrbitzAirTrafficController', function() {
  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo.html');
    this.controller = new OrbitzAirTrafficController(document);
  });

  itBehavesLikeAn('AirTrafficController');
});
