Preferences = function() {};

Preferences.prototype.get = function(key, callback, defaultValue) {
  this.nativeGet(key,
                 PreferencesEvents.nativeGetCallbackWithDefaultValue(key, callback, defaultValue));
};
Preferences.prototype.getBoolean = function(key, callback, defaultValue) {
  this.nativeGetBoolean(key,
                        PreferencesEvents.nativeGetCallbackWithDefaultValue(key, callback, defaultValue));
};

Preferences.prototype.put = function(key, value) {
  this.nativePut(key, value);
  return value;
};
Preferences.prototype.putBoolean = function(key, value) {
  this.nativePutBoolean(key, value);
  return value;
};


PreferencesEvents = {
  nativeGetCallbackWithDefaultValue: function(key, callback, defaultValue) {
    return function(value) {
      if(value == null && defaultValue != null) {
        value = defaultValue;
      }
      callback(value);
    };
  }
};
