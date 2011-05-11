SafariPreferences = function() {
  safari.self.addEventListener('message', SafariPreferences.events.preferencesGetCallback(this), false);
  this.callbacks = [];
};
SafariPreferences.prototype = new Preferences();

SafariPreferences.events = {
  convertStringPreferenceToBoolean: function(callback) {
    return function(pref) {
      var result;
      if(pref == null) {
        result = null;
      } else {
        result = (pref == 'true');
      }
      callback(result);
    };
  },

  preferencesGetCallback: function(preferences) {
    return function(event) {
      if(event.name == 'preferences.get') {
        var callback = preferences.callbacks[event.message.callbackId];
        callback(event.message.value);
      }
    }
  }
};

SafariPreferences.prototype.nativeGet = function(key, callback) {
  var callbackId = this.callbacks.length;  // this is so ghetto
  this.callbacks.push(callback);
  safari.self.tab.dispatchMessage('preferences.get', { key: key, callbackId: callbackId });
};
SafariPreferences.prototype.nativeGetBoolean = function(key, callback) {
  this.nativeGet(key, SafariPreferences.events.convertStringPreferenceToBoolean(callback));
};

SafariPreferences.prototype.nativePut = function(key, value) {
  value = (value === true || value == 'true');
  safari.self.tab.dispatchMessage('preferences.put', { key: key, value: value });
  return value;
};
SafariPreferences.prototype.nativePutBoolean = SafariPreferences.prototype.nativePut;
