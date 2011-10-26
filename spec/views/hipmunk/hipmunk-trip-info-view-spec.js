require('../trip-info-view-examples');

describe('HipmunkTripInfoView', function() {
  var HipmunkTripInfoView = require('views/hipmunk/hipmunk-trip-info-view');

  beforeEach(function() {
    this.trip = {
      totalFootprint: 143.2,
      origin: function() { return 'DTW' },
      destination: function() { return 'SFO' }
    };
    this.view = new HipmunkTripInfoView(document.createElement('div'));
    this.view.init();
  });

  itBehavesLikeA('TripInfoView');
});
