require('../../helpers/spec-helper');
require('../../trip-examples');

describe('OrbitzTrip', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var OrbitzTrip = require('drivers/orbitz/orbitz-trip');

  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo_result.html');
    this.trip = new OrbitzTrip(0, $('.result').get(0));
  });

  itBehavesLikeA('Trip');
});
