SafariPreferences = function() {
  safari.self.addEventListener('message', SafariPreferences.events.preferencesGetCallback(this), false);
  this.callbacks = [];
};
SafariPreferences.prototype = new Preferences();

GoogleChromePreferences.events = {
  preferencesGetCallback: function(prefs) {
    return function(event) {
      var message = event.message;
      if(event.name == 'preferences.get.callback') {
        prefs.executeCallback(message.callbackId, message.value) {
      }
    };
  }
};

SafariPreferences.prototype.nativeGet = function(key, callbackId, defaultValue) {
  safari.self.tab.dispatchMessage('preferences.get', { key: key, callbackId: callbackId, defaultValue: defaultValue });
};

SafariPreferences.prototype.nativePut = function(key, value) {
  value = (value === true || value == 'true');
  safari.self.tab.dispatchMessage('preferences.put', { key: key, value: value });
  return value;
};
