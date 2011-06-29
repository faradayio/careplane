GoogleChromePreferences = function() {
  chrome.extension.onRequest.
    addListener(GoogleChromePreferences.events.preferencesGetCallback(this));
  this.callbacks = [];
};
GoogleChromePreferences.prototype = new Preferences();

GoogleChromePreferences.events = {
  preferencesGetCallback: function(prefs) {
    return function(request) {
      if(request.action == 'preferences.get.callback') {
        prefs.executeCallback(prefs, request.callbackId, request.value) {
      }
    };
  }
};

GoogleChromePreferences.prototype.nativeGet = function(key, callback) {
  chrome.extension.sendRequest({ action: 'preferences.get', key: key }, callback);
};

GoogleChromePreferences.prototype.nativePut = function(key, value) {
  value = (value === true || value == 'true');
  chrome.extension.sendRequest({ action: 'preferences.put', key: key, value: value });
  return value;
};
