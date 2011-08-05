describe('OrbitzTripInfoView', function() {
  var OrbitzTripInfoView = require('views/Orbitz/OrbitzTripInfoView');

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
