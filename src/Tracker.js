Tracker = function(doc){
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-1667526-26']);

  function() {
    var ga = doc.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    doc.head.appendChild(ga);
  };

  return {
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
}
