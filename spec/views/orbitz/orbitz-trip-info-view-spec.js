require('../trip-info-view-examples');

describe('OrbitzTripInfoView', function() {
  var OrbitzTripInfoView = require('views/orbitz/orbitz-trip-info-view');

  beforeEach(function() {
    this.trip = {
      totalFootprint: 143.2,
      origin: function() { return 'DTW' },
      destination: function() { return 'SFO' }
    };
    this.view = new OrbitzTripInfoView(document.createElement('div'));
    this.view.init();
  });

  itBehavesLikeA('TripInfoView');
});
