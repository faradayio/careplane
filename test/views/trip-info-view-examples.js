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
  var view = new viewClass($, $('<div></div>'));
  view.init();

  return {
    '#updateSearchAverage': {
      'updates the search average': function() {
        view.updateSearchAverage(1234, trip);
        assert.match($(view.target()).find('.careplane-search-average-comparison').text(), /%/);
      },
      'analyzes the result': function() {
        view.updateSearchAverage(1234, trip);
        assert.match($(view.target()).find('.careplane-search-average-analysis').text(), /car/);
      }
    },

    '#reportFlightMethodology': {
      'adds a methodology URL to the ul': function() {
        var flight = { origin: 'DTW', destination: 'IAD' };
        view.reportFlightMethodology('http://carbon.bp.com/methodology', flight);
        assert.match($(view.target()).find('ul li a').text(), /DTW/);
      }
    }
  };
};
