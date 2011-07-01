Worker = function() {};

Worker.events = {
  listen: function(worker) {
    return function() {
      worker.handleMessage.apply(worker, arguments);
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
  if(val === null || typeof val == 'undefined') {
    val = params.defaultValue;
    this.preferences[params.key] = val;
  }
  if(typeof params.callbackId != 'undefined') {
    this.sendCallback('preferences.get.callback', val, params.callbackId, caller);
  } else {
    return val;
  }
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



FirefoxWorker = function(addon, driver) {
  this.addon = addon;
  this.driver = driver;
  this.preferences = require('simple-storage').storage;
  this.tracker = new require('CareplaneTrackerService').tracker('firefox');
  this.data = require('self').data;
};
FirefoxWorker.prototype = new Worker();

FirefoxWorker.prototype.init = function() {
  if(this.getPreference({ key: 'sites.' + this.driver, defaultValue: true })) {
    this.welcomeOnFirstRun();
    this.addListeners();
    this.loadDriver();
    this.addStylesheet();
  }
};

FirefoxWorker.prototype.welcome = function() {
  require('tabs').open(this.url);
};

FirefoxWorker.messageHandler = function(worker, message) {
  return function(params) {
    worker.processMessage(message, params);
  };
};

FirefoxWorker.prototype.addListeners = function() {
  this.addon.port.on('tracker.firstRun', FirefoxWorker.messageHandler(this, 'tracker.firstRun'));
  this.addon.port.on('tracker.search',   FirefoxWorker.messageHandler(this, 'tracker.search'));
  this.addon.port.on('tracker.purchase', FirefoxWorker.messageHandler(this, 'tracker.purchase'));
};

FirefoxWorker.prototype.loadDriver = function() {
  this.addon.port.emit('driver.load', this.driver);
};

FirefoxWorker.prototype.addStylesheet = function() {
  this.addon.port.emit('stylesheet.load', this.data.url('careplane.css'));
};



GoogleChromeWorker = function() {
  this.preferences = localStorage;
  this.tracker = new CareplaneTrackerService();
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

SafariWorker.prototype.sendCallback = function(message, val, id, target) {
  target.page.dispatchMessage(message, { value: val, callbackId: id });
};



if(typeof exports != 'undefined') {
  exports.firefox = FirefoxWorker;
  exports.google_chrome = GoogleChromeWorker;
  exports.safari = SafariWorker;
}
