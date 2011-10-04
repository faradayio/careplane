var Tracker = require('../../tracker');

var FirefoxTracker = Tracker;
FirefoxTracker.sendRequest = function(action, params) {
  self.port.emit(action, params);
};

module.exports = FirefoxTracker;
