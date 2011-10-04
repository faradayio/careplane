describe('OrbitzTrip', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var OrbitzTrip = require('drivers/orbitz/orbitz-trip');

  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    loadFixtures('orbitz_dtw_sfo_result.html');
    this.trip = new OrbitzTrip(this.extension, 0, $('.result').get(0));
  });

  itBehavesLikeA('Trip');
});
