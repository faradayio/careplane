describe('OrbitzTripFootprintView', function() {
  var OrbitzTripFootprintView = require('views/Orbitz/OrbitzTripFootprintView');

  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo_result.html');
    this.view = new OrbitzTripFootprintView($('.result').get(0));
    this.view.init();
  });

  itBehavesLikeA('TripFootprintView');
});
