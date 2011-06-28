Worker = function() {};

Worker.events = {
  listen = function(worker) {
    return function() {
      worker.handleMessage(arguments);
    };
  }
};

Worker.prototype.url = 'http://careplane.org/welcome.html';

Worker.prototype.init = function() {
  this.welcomeOnFirstRun();
  this.addListener(Worker.events.listen(this));
};

Worker.prototype.welcomeOnFirstRun = function() {
  if(!this.getPreference({ key: 'hasRunPreviously', defaultValue: false })) {
    this.welcome();
    this.setPreference('hasRunPreviously', true);
  }
};

Worker.prototype.getPreference = function(params, caller) {
  var val = this.preferences[params.key];
  if(params.callbackId) {
    this.sendCallback(val, params.callbackId, caller);
    
};
Worker.prototype.setPreference = function(key, value) {
  this.preferences[key] = value;
  return value;
};

Worker.prototype.processMessage = function(message, params, caller) {
  switch(message) {
  case 'preferences.get':
    this.getPreference(params, caller);
    break;
  case 'preferences.put':
    this.setPreference(params.key, params.value);
    break;
  case 'tracker.firstRun':
    this.tracker.firstRun();
    break;
  case 'tracker.search':
    this.tracker.search(params.site, params.origin, params.destination, params.averageCo2);
    break;
  case 'tracker.purchase':
    this.tracker.purchase(params.origin, params.destination, params.cost, params.minCost, params.co2, params.averageCo2);
    break;
  }
};



FirefoxWorker = function() {
  this.preferences = require("simple-storage").storage;
  this.tracker = new FirefoxTracker();
};
FirefoxWorker.prototype = new Worker();

FirefoxWorker.prototype.init = function() {
  this.welcomeOnFirstRun();
  this.addListeners();
};

FirefoxWorker.prototype.welcome = function() {
  require('tabs').open(this.url);
};

FirefoxWorker.messageHandler = function(worker, message) {
  return function(params) {
    worker.processMessage(message, params);
  };
};

FirefoxWorker.prototype.addListeners = function(module) {
  var worker = this;
  ['welcome', 'preferences.get', 'preferences.put',
   'tracker.firstRun', 'tracker.search', 'tracker.purchase'].each(function(message) {
    module.port.on(message, FirefoxWorker.messageHandler(worker, message));
  });
};

FirefoxWorker.prototype.sendCallback = function(val, id) {
  self.postMessage('preferences.get.callback',
      { value: val, callbackId: callbackId });
};



GoogleChromeWorker = function() {
  this.preferences = localStorage;
  this.tracker = new GoogleChromeTracker();
};
GoogleChromeWorker.prototype = new Worker();

GoogleChromeWorker.prototype.addListener = function(listener) {
  chrome.extension.onRequest.addListener(listener);
};

GoogleChromeWorker.prototype.welcome = function() {
  chrome.tabs.create({ url: this.url });
};

GoogleChromeWorker.prototype.handleMessage = function(request, sender, callback) { 
  this.processMessage(request.action, request);
};

GoogleChromeWorker.prototype.sendCallback = function(val, id) {
  chrome.extension.sendRequest('preferences.get.callback',
      { value: val, callbackId: callbackId });
};



SafariWorker = function() {
  this.preferences = safari.extension.settings;
  this.tracker = new SafariTracker();
  this.addListener = safari.application.addEventListener;
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

SafariWorker.prototype.sendCallback = function(val, id, target) {
  target.page.dispatchMessage('preferences.get.callback',
      { value: val, callbackId: id });
};



if(typeof exports != 'undefined') {
  exports.firefox = FirefoxCareplaneWorker;
  exports.google_chrome = GoogleChromeWorker;
  exports.safari = SafariWorker;
}
