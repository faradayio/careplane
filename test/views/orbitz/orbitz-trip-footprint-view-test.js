require('./helper');

require('../trip-footprint-view-examples');

vows.describe('OrbitzTripFootprintView').addBatch({
  var OrbitzTripFootprintView = require('views/orbitz/orbitz-trip-footprint-view');

  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo_result.html');
    this.view = new OrbitzTripFootprintView($('.result').get(0));
    this.view.init();
  });

  itBehavesLikeA('TripFootprintView');
});
