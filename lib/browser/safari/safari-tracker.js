var Tracker = require('../../tracker');

var SafariTracker = Tracker;
SafariTracker.sendRequest = function(action, params) {
  safari.self.tab.dispatchMessage(action, params);
};

module.exports = SafariTracker;
