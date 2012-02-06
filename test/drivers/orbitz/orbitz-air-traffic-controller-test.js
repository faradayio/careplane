var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

require('../../air-traffic-controller-examples');

vows.describe('OrbitzAirTrafficController').addBatch({
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var Orbitz = require('drivers/orbitz');
  var OrbitzAirTrafficController = require('drivers/orbitz/orbitz-air-traffic-controller');

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
