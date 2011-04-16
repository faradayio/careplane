describe('TripInfoView', function() {
  var view;
  beforeEach(function() {
    view = new TripInfoView(document.createElement('div'));
    view.init();
  });

  describe('#updateSearchAverage', function() {
    it('updates the search average', function() {
      view.updateSearchAverage(1234);
      expect($(view.target()).find('span.careplane-search-average')).toHaveText(/[\d,]+/);
    });
  });
  describe('#reportFlightMethodology', function() {
    it('adds a methodology URL to the ul', function() {
      var flight = { origin: 'DTW', destination: 'IAD' };
      view.reportFlightMethodology('http://carbon.bp.com/methodology', flight);
      expect($(view.target()).find('ul li a')).toHaveText(/DTW/);
    });
  });
});
