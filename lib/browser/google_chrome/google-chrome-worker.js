var CareplaneTrackerService = require ('../../careplane-tracker-service'),
    Worker = require('../../worker');

var GoogleChromeWorker = function() {
  this.preferences = localStorage;
  this.tracker = new CareplaneTrackerService('google_chrome');
};
GoogleChromeWorker.prototype = new Worker();

GoogleChromeWorker.prototype.addListener = function(listener) {
  chrome.extension.onRequest.addListener(listener);
};

GoogleChromeWorker.prototype.welcome = function() {
  chrome.tabs.create({ url: this.url });
};

GoogleChromeWorker.prototype.handleMessage = function(request, sender, callback) { 
  this.processMessage(request.action, request, sender);
};

GoogleChromeWorker.prototype.sendCallback = function(message, val, id, caller) {
  chrome.tabs.sendRequest(caller.tab.id,
      { action: message, value: val, callbackId: id },
      function() {});
};



