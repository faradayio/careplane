var CareplaneTrackerService = require('../../careplane-tracker-service'),
    Worker = require('../../worker');

var SafariWorker = module.exports = function() {
  this.preferences = safari.extension.settings;
  this.tracker = new CareplaneTrackerService('safari');
};
SafariWorker.prototype = new Worker();

SafariWorker.prototype.addListener = function(listener) {
  safari.application.addEventListener('message', listener);
};

SafariWorker.prototype.welcome = function() {
  var tab = safari.application.activeBrowserWindow.openTab();
  tab.url = this.url;
};

SafariWorker.prototype.handleMessage = function(event) { 
  this.processMessage(event.name, event.message, event.target);
};

SafariWorker.prototype.sendCallback = function(message, val, id, target) {
  target.page.dispatchMessage(message, { value: val, callbackId: id });
};
