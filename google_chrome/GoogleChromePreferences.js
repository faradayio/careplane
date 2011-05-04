GoogleChromePreferences = function() {};
GoogleChromePreferences.prototype = new Preferences();

GoogleChromePreferences.prototype.nativeGet = function(key, callback) {
  chrome.extension.sendRequest({ action: 'preferences.get', key: key }, callback);
};
GoogleChromePreferences.prototype.nativeGetBoolean = function(key, callback) {
  chrome.extension.sendRequest({ action: 'preferences.get', key: key },
                               GoogleChromePreferencesEvents.convertStringPreferenceToBoolean(callback));
};

GoogleChromePreferences.prototype.nativePut = function(key, value) {
  value = (value === true || value == 'true');
  chrome.extension.sendRequest({ action: 'preferences.put', key: key, value: value });
  return value;
};
GoogleChromePreferences.prototype.nativePutBoolean = GoogleChromePreferences.prototype.nativePut;



GoogleChromePreferencesEvents = {
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
  }
};
