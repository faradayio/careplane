TestPreferences = function() {
  this.prefService = {};
  this.callbacks = [];
};
TestPreferences.prototype = new Preferences();

TestPreferences.prototype.nativeGet = function(key, callbackId, defaultValue) {
  this.callbacks[callbackId](this.prefService[key]);
};

TestPreferences.prototype.nativePut = function(key, value) {
  this.prefService[key] = value;
};
