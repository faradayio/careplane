require('./helper');

require('../trip-footprint-view-examples');

vows.describe('BingTripFootprintView').addBatch({
  var BingTripFootprintView = require('views/bing/bing-trip-footprint-view');

  beforeEach(function() {
    loadFixtures('bing_dtw_sfo_flight.html');
    this.view = new BingTripFootprintView($('#flightDetails_0').get(0));
    this.view.init();
  });

  itBehavesLikeA('TripFootprintView');
});
