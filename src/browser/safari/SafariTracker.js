var Tracker = require('../../Tracker');

var SafariTracker = Tracker;
SafariTracker.sendRequest = function(action, params) {
  safari.self.tab.dispatchMessage(action, params);
};

module.exports = SafariTracker;
