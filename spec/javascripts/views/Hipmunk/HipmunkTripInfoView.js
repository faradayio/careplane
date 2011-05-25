describe('HipmunkTripInfoView', function() {
  var trip;
  beforeEach(function() {
    TestExtension.urlMap['carbon.brighterplanet.com/flights'] = "{ \"emission\": 1200 }"
    trip = {
      totalFootprint: 143.2,
      origin: function() { return 'DTW' },
      destination: function() { return 'SFO' }
    };
    this.view = new HipmunkTripInfoView(document.createElement('div'));
    this.view.init();
  });

  itBehavesLikeA('TripInfoView');
});