require('../trip-info-view-examples');

describe('BingTripInfoView', function() {
  var BingTripInfoView = require('views/bing/bing-trip-info-view');

  beforeEach(function() {
    this.trip = {
      totalFootprint: 143.2,
      origin: function() { return 'DTW' },
      destination: function() { return 'SFO' }
    };
    this.view = new BingTripInfoView(document.createElement('div'));
    this.view.init();
  });

  itBehavesLikeA('TripInfoView');
});
