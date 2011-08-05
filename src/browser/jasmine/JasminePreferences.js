var Preferences = require('../../Preferences');

var JasminePreferences = function() {
  this.prefService = {};
  this.callbacks = [];
};
JasminePreferences.prototype = new Preferences();

JasminePreferences.prototype.nativeGet = function(key, callbackId, defaultValue) {
  this.callbacks[callbackId](this.prefService[key]);
};

JasminePreferences.prototype.nativePut = function(key, value) {
  this.prefService[key] = value;
};

module.exports = JasminePreferences;
