describe('HipmunkTripInfoView', function() {
  var view, trip;
  beforeEach(function() {
    TestExtension.urlMap['carbon.brighterplanet.com/flights'] = "{ \"emission\": 1200 }"
    trip = {
      totalFootprint: 143.2,
      origin: function() { return 'DTW' },
      destination: function() { return 'SFO' }
    };
    view = new HipmunkTripInfoView(document.createElement('div'));
    view.init();
  });

  describe('#updateSearchAverage', function() {
    it('updates the search average', function() {
      view.updateSearchAverage(1234, trip);
      expect($(view.target()).find('.careplane-search-average')).toHaveText(/[\d,]+/);
    });
    it('analyzes the result', function() {
      view.updateSearchAverage(1234, trip);
      expect($(view.target()).find('.careplane-search-average-analysis')).toHaveText(/car/);
    });
  });

  describe('#reportFlightMethodology', function() {
    it('adds a methodology URL to the ul', function() {
      var flight = { origin: 'DTW', destination: 'IAD' };
      view.reportFlightMethodology('http://carbon.bp.com/methodology', flight);
      expect($(view.target()).find('ul li a')).toHaveText(/DTW/);
    });
  });

  describe('#updateTripAverage', function() {
    it('displays the trip average', function() {
      view.updateTripAverage(trip);
      expect($(view.target()).find('.careplane-trip-average')).
        toHaveText(/[\d,]+/);
      expect($(view.target()).find('.careplane-trip-average-origin')).
        toHaveText(/DTW/);
      expect($(view.target()).find('.careplane-trip-average-destination')).
        toHaveText(/SFO/);
    });
    it('analyzes the result', function() {
      view.updateTripAverage(trip);
      expect($(view.target()).find('.careplane-trip-average-analysis')).toHaveText(/car/);
    });
  });
});
