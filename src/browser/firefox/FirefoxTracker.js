FirefoxTracker = Tracker;
FirefoxTracker.sendRequest = function(action, params) {
  params.action = action;
  self.port.emit(params);
};
