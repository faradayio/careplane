describe('OrbitzTrip', function() {
  var TestExtension = require('browser/test/TestExtension');
  var OrbitzTrip = require('drivers/Orbitz/OrbitzTrip');

  beforeEach(function() {
    this.extension = new TestExtension(document);
    loadFixtures('orbitz_dtw_sfo_result.html');
    this.trip = new OrbitzTrip(this.extension, 0, $('.result').get(0));
  });

  itBehavesLikeA('Trip');
});
