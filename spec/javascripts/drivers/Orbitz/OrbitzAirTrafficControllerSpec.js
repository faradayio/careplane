describe('OrbitzAirTrafficController', function() {
  beforeEach(function() {
    this.controller = null;
    loadFixtures('orbitz_dtw_sfo.html');
    this.controller = OrbitzAirTrafficController.create(document);
  });

  itBehavesLikeAn('AirTrafficController');
});
