Tracker = function(doc){
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-1667526-26']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

  return {
    firstRun: function() {
      _gaq.push(['_trackEvent', 'First Run', 'Welcome']);
    },
    search: function(origin, destination, averageCo2) {
      _gaq.push(['_trackEvent', 'Search', origin + '-' + destination, averageCo2]);
    },
    purchase: function(airline, origin, destination, cost, minCost, averageCo2) {
      _gaq.push(['_trackEvent', 'Purchase', 'Route', airline + '/' + origin + '-' + destination, cost]);

      var pctCo2Difference = co2 / averageCo2;
      if(Math.abs(cost - minCost) < 1) {
        _gaq.push(['_trackEvent', 'Purchase', 'Cheapest', 'CO2 % Difference', pctCo2Difference]);
      } else {
        _gaq.push(['_trackEvent', 'Purchase', 'Premium', 'CO2 % Difference', pctCo2Difference]);
      }
    }
  };
}
