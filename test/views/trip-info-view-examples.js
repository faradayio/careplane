var helper = require('../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

module.exports = function(viewClass) {
  var trip = {
    totalFootprint: 143.2,
    origin: function() { return 'DTW' },
    destination: function() { return 'SFO' }
  };
  var $ = helper.qweryFixture();
  var view = new viewClass($('<div></div>'));
  view.init();

  return {
    '#updateSearchAverage': {
      'updates the search average': function() {
        view.updateSearchAverage(1234, trip);
        expect($(this.view.target()).find('.careplane-search-average-comparison')).toHaveText(/%/);
      },
      'analyzes the result': function() {
        this.view.updateSearchAverage(1234, trip);
        expect($(this.view.target()).find('.careplane-search-average-analysis')).toHaveText(/car/);
      }
    },

    '#reportFlightMethodology': {
      'adds a methodology URL to the ul': function() {
        var flight = { origin: 'DTW', destination: 'IAD' };
        this.view.reportFlightMethodology('http://carbon.bp.com/methodology', flight);
        expect($(this.view.target()).find('ul li a')).toHaveText(/DTW/);
      }
    }
  };
};
