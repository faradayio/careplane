var Preferences = function() {};

Preferences.events = {
  convertStringPreferenceToBoolean: function(callback) {
    return function(value) {
      callback((value === true || value == 'true'));
    };
  }
};

Preferences.prototype.executeCallback = function(id, val) {
  var callback = this.callbacks[id];
  callback(val);
};

Preferences.prototype.get = function(key, callback, defaultValue) {
  var callbackId = this.callbacks.length;
  this.callbacks.push(callback);
  this.nativeGet(key, callbackId, defaultValue);
};
Preferences.prototype.getBoolean = function(key, callback, defaultValue) {
  var callbackId = this.callbacks.length;
  this.callbacks.push(Preferences.events.convertStringPreferenceToBoolean(callback));
  this.nativeGet(key, callbackId, defaultValue);
};

Preferences.prototype.put = function(key, value) {
  this.nativePut(key, value);
  return value;
};
Preferences.prototype.putBoolean = Preferences.prototype.put;

module.exports = Preferences;
