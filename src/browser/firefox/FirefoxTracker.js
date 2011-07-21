FirefoxTracker = Tracker;
FirefoxTracker.sendRequest = function(action, params) {
  self.port.emit(action, params);
};
