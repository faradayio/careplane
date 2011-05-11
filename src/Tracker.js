GoogleTracker = {
  firstRun: function() {
    chrome.extension.sendRequest({ action: 'tracker.firstRun' });
  },
  search: function(site, origin, destination, averageCo2) {
    chrome.extension.sendRequest({ action: 'tracker.search',
      site: site, origin: origin, destination: destination, averageCo2: averageCo2 });
  },
  purchase: function(origin, destination, cost, minCost, co2, averageCo2) {
    chrome.extension.sendRequest({ action: 'tracker.purchase',
      origin: origin, destination: destination, cost: cost, minCost: minCost, co2: co2, averageCo2: averageCo2 });
  }
};

FirefoxTracker = {
  firstRun: function() {
  },
  search: function(site, origin, destination, averageCo2) {
  },
  purchase: function(origin, destination, cost, minCost, co2, averageCo2) {
  }
};

SafariTracker = {
  firstRun: function() {
    safari.self.tab.dispatchMessage('tracker.firstRun');
  },
  search: function(site, origin, destination, averageCo2) {
    safari.self.tab.dispatchMessage('tracker.search',
        { site: site, origin: origin, destination: destination, averageCo2: averageCo2 });
  },
  purchase: function(origin, destination, cost, minCost, co2, averageCo2) {
    safari.self.tab.dispatchMessage('tracker.purchase', {
      origin: origin, destination: destination, cost: cost, minCost: minCost, co2: co2, averageCo2: averageCo2 });
  }
};
