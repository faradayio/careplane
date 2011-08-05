describe('OrbitzAirTrafficController', function() {
  var JasmineExtension = require('browser/jasmine/JasmineExtension');
  var Orbitz = require('drivers/Orbitz');
  var OrbitzAirTrafficController = require('drivers/Orbitz/OrbitzAirTrafficController');

  var orbitz;
  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    orbitz = new Orbitz(this.extension);
  });

  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo.html');
    this.controller = new OrbitzAirTrafficController(orbitz, document);
  });

  itBehavesLikeAn('AirTrafficController');
});
