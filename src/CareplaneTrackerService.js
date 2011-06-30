CareplaneTrackerService = function(browser) {
  this.browser = browser;
};

CareplaneTrackerService.prototype = {
  firstRun: function() {
    _gaq.push(['_trackEvent', 'First Run', 'Welcome']);
  },
  search: function(site, origin, destination, averageCo2) {
    _gaq.push(['_trackEvent', 'Search', site, origin + '-' + destination, averageCo2]);
  },
  purchase: function(origin, destination, cost, minCost, co2, averageCo2) {
    _gaq.push(['_trackEvent', 'Purchase', 'Route', origin + '-' + destination, cost]);

    var pctCo2Difference = Math.round((co2 / averageCo2) * 100);
    if(cost - minCost <= 0) {
      _gaq.push(['_trackEvent', 'Purchase', 'Cheapest', 'CO2 % Difference', pctCo2Difference]);
    } else {
      _gaq.push(['_trackEvent', 'Purchase', 'Premium', 'CO2 % Difference', pctCo2Difference]);
    }
  }
};

if(typeof exports != 'undefined') {
  exports.tracker = CareplaneTrackerService;
}
