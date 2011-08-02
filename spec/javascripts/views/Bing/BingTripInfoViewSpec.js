describe('KayakTripInfoView', function() {
  beforeEach(function() {
    TestExtension.urlMap['carbon.brighterplanet.com/flights'] = "{ \"emission\": 1200 }"
    this.trip = {
      totalFootprint: 143.2,
      origin: function() { return 'DTW' },
      destination: function() { return 'SFO' }
    };
    this.view = new KayakTripInfoView(document.createElement('div'));
    this.view.init();
  });

  itBehavesLikeA('TripInfoView');
});
