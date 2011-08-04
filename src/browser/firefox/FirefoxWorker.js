var Worker = require('../../Worker').Worker;

FirefoxWorker = {
  messageHandler: function(worker, message) {
    return function(params) {
      worker.processMessage(message, params);
    };
  }
};



FirefoxPanelWorker = function(panel) {
  this.panel = panel;
  this.preferences = require('simple-storage').storage;
  this.data = require('self').data;
  var FirefoxCareplaneTrackerService = require('./FirefoxCareplaneTrackerService');
  this.tracker = new FirefoxCareplaneTrackerService();
};
FirefoxPanelWorker.prototype = new Worker();

FirefoxPanelWorker.prototype.init = function() {
  this.addListeners();
  this.welcomeOnFirstRun();
};

FirefoxPanelWorker.prototype.addListeners = function() {
  this.panel.port.on('preferences.put', FirefoxWorker.messageHandler(this, 'preferences.put'));
  this.panel.port.on('tracker.search',   FirefoxWorker.messageHandler(this, 'tracker.search'));
  this.panel.port.on('tracker.purchase', FirefoxWorker.messageHandler(this, 'tracker.purchase'));
  this.panel.port.on('notify', FirefoxWorker.messageHandler(this, 'notify'));
};

FirefoxPanelWorker.prototype.welcome = function() {
  require('tabs').open(this.url);
};



FirefoxModWorker = function(mod, panel) {
  this.mod = mod;
  this.panel = panel;
  this.preferences = require('simple-storage').storage;
  var FirefoxCareplaneTrackerService = require('./FirefoxCareplaneTrackerService');
  this.tracker = new FirefoxCareplaneTrackerService();
  this.data = require('self').data;
};
FirefoxModWorker.prototype = new Worker();

FirefoxModWorker.prototype.init = function(driver) {
  this.driver = driver;
  if(this.getPreference({ key: 'sites.' + this.driver, defaultValue: true })) {
    this.addListeners();
    this.loadDriver();
    this.addStylesheet();
  }
};

FirefoxModWorker.prototype.loadDriver = function() {
  this.mod.port.emit('driver.load', this.driver);
};

FirefoxModWorker.prototype.addStylesheet = function() {
  this.mod.port.emit('stylesheet.load', this.data.url('careplane.css'));
};

FirefoxModWorker.prototype.addListeners = function() {
  this.mod.port.on('preferences.put', FirefoxWorker.messageHandler(this, 'preferences.put'));
  this.mod.port.on('tracker.firstRun', FirefoxWorker.messageHandler(this, 'tracker.firstRun'));
  this.mod.port.on('tracker.search',   FirefoxWorker.messageHandler(this, 'tracker.search'));
  this.mod.port.on('tracker.purchase', FirefoxWorker.messageHandler(this, 'tracker.purchase'));
  this.mod.port.on('notify', FirefoxWorker.messageHandler(this, 'notify'));
};

exports.FirefoxWorker = FirefoxWorker;
exports.FirefoxPanelWorker = FirefoxPanelWorker;
exports.FirefoxModWorker = FirefoxModWorker;
