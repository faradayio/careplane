CareplaneTrackerService = function(browser) {
  this.browser = browser;
  if(this.browser == 'firefox') {
    this.Request = require('request').Request;
    this.post = this.firefoxPost;
  } else {
    this.post = this.xhrPost;
  }
};

// Can't use jQuery with some browsers, so just use old fashioned XHR
CareplaneTrackerService.prototype.xhrPost = function(url, params) {
  var req = new XMLHttpRequest();
  req.open('POST', url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(params));
};

CareplaneTrackerService.prototype.firefoxPost = function(url, params) {
  var req = this.Request({
    url: url,
    content: params
  });
  req.post();
};

CareplaneTrackerService.prototype.postStatistic = function(params) {
  params.date = Date.now();
  params.browser = this.browser;
  this.post('http://careplane-stats-rest.herokuapp.com/main', params);
};

CareplaneTrackerService.prototype.firstRun = function() {
  this.postStatistic({ event: 'firstRun' });
};

CareplaneTrackerService.prototype.search = function(site, origin, destination, averageCo2) {
  this.postStatistic({
    event: 'search',
    origin: origin,
    destination: destination,
    averageCo2: averageCo2
  });
};

CareplaneTrackerService.prototype.purchase = function(origin, destination, cost, minCost, co2, averageCo2) {
  params = {
    event: 'purchase/route',
    origin: origin,
    destination: destination,
    cost: cost,
    pctCo2Difference: Math.round((co2 / averageCo2) * 100)
  };

  if(cost - minCost <= 0) {
    params.cheapest = true
  } else {
    params.premium = true
  }

  this.postStatistic(params);
};

if(typeof exports != 'undefined') {
  exports.tracker = CareplaneTrackerService;
}
