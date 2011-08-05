describe('OrbitzTrip', function() {
  var JasmineExtension = require('browser/jasmine/JasmineExtension');
  var OrbitzTrip = require('drivers/Orbitz/OrbitzTrip');

  beforeEach(function() {
    this.extension = new JasmineExtension(document);
    loadFixtures('orbitz_dtw_sfo_result.html');
    this.trip = new OrbitzTrip(this.extension, 0, $('.result').get(0));
  });

  itBehavesLikeA('Trip');
});
