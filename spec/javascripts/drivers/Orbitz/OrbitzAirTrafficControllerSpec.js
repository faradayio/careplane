describe('OrbitzAirTrafficController', function() {
  var orbitz;

  beforeEach(function() {
    this.extension = new TestExtension(document);
    orbitz = new Orbitz(this.extension);
  });

  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo.html');
    this.controller = new OrbitzAirTrafficController(orbitz, document);
  });

  itBehavesLikeAn('AirTrafficController');
});
