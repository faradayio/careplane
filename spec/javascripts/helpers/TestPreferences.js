TestPreferences = function() {
  this.prefService = {};
};
TestPreferences.prototype = new Preferences();

TestPreferences.prototype.nativeGet = function(key, callback) {
  callback(this.prefService[key]);
};
TestPreferences.prototype.nativeGetBoolean = function(key, callback) {
  callback(this.prefService[key] == true);
};

TestPreferences.prototype.nativePut = function(key, value) {
  this.prefService[key] = value;
};
TestPreferences.prototype.nativePutBoolean = function(key, value) {
  this.prefService[key] = (value == true);
};
