var Tracker = require('../../Tracker');

var GoogleChromeTracker = Tracker;
GoogleChromeTracker.sendRequest = function(action, params) {
  params.action = action;
  chrome.extension.sendRequest(params);
};

module.exports = GoogleChromeTracker;
