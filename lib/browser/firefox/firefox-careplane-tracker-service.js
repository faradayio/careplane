var CareplaneTrackerService = require('careplane-tracker-service');

var FirefoxCareplaneTrackerService = function() {
  this.browser = 'firefox';
  this.Request = require('request').Request;
};
FirefoxCareplaneTrackerService.prototype = new CareplaneTrackerService();

FirefoxCareplaneTrackerService.prototype.post = function(url, params) {
  var req = this.Request({
    url: url,
    content: params
  });
  req.post();
};

module.exports = FirefoxCareplaneTrackerService;
