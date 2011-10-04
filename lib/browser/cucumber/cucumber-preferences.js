var Preferences = require('../../preferences');

var CucumberPreferences = function() {
  this.prefService = {};
  this.callbacks = [];
};
CucumberPreferences.prototype = new Preferences();

CucumberPreferences.prototype.nativeGet = function(key, callbackId, defaultValue) {
  this.callbacks[callbackId](this.prefService[key]);
};

CucumberPreferences.prototype.nativePut = function(key, value) {
  this.prefService[key] = value;
};

module.exports = CucumberPreferences;
