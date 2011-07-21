Tracker = {
  firstRun: function() {
    this.sendRequest('tracker.firstRun');
  },
  search: function(site, origin, destination, averageCo2) {
    this.sendRequest('tracker.search', {
      site: site, origin: origin, destination: destination, averageCo2: averageCo2 });
  },
  purchase: function(origin, destination, cost, minCost, co2, averageCo2) {
    this.sendRequest('tracker.purchase', {
      origin: origin, destination: destination, cost: cost, minCost: minCost, co2: co2, averageCo2: averageCo2 });
  }
};
