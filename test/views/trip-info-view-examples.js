require('./helper');

sharedExamplesFor('TripInfoView', function() {
  '#updateSearchAverage': {
    'updates the search average': function() {
      this.view.updateSearchAverage(1234, this.trip);
      expect($(this.view.target()).find('.careplane-search-average-comparison')).toHaveText(/%/);
    });
    'analyzes the result': function() {
      this.view.updateSearchAverage(1234, this.trip);
      expect($(this.view.target()).find('.careplane-search-average-analysis')).toHaveText(/car/);
    });
  });

  '#reportFlightMethodology': {
    'adds a methodology URL to the ul': function() {
      var flight = { origin: 'DTW', destination: 'IAD' };
      this.view.reportFlightMethodology('http://carbon.bp.com/methodology', flight);
      expect($(this.view.target()).find('ul li a')).toHaveText(/DTW/);
    });
  });
});
