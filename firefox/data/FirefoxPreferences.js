FirefoxPreferences = function() {
  self.on('message', FirefoxPreferences.events.preferencesGetCallback(this), false);
  this.callbacks = [];
};
FirefoxPreferences.prototype = new Preferences();

FirefoxPreferences.events = {
  preferencesGetCallback: function(prefs) {
    return function(message, params) {
      if(message == 'preferences.get.callback') {
        prefs.executeCallback(prefs, params.callbackId, params.value) {
      }
    };
  }
};

FirefoxPreferences.prototype.nativeGet = function(key, callbackId, defaultValue) {
  self.postMessage({
    action: 'preferences.get.callback',
    key: key,
    callbackId: callbackId,
    defaultValue: defaultValue
  });
};

FirefoxPreferences.prototype.nativePut = function(key, value) {
  self.postMessage({ action: 'preferences.put', key: key, value: value });
  return value;
};
