describe('OrbitzAirTrafficController', function() {
  var TestExtension = require('browser/test/TestExtension');
  var Orbitz = require('drivers/Orbitz');
  var OrbitzAirTrafficController = require('drivers/Orbitz/OrbitzAirTrafficController');

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
