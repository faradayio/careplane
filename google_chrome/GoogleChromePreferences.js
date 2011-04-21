GoogleChromePreferences = function() {};
GoogleChromePreferences.prototype = new Preferences();

GoogleChromePreferences.prototype.nativeGet = function(key, callback) {
  chrome.extension.sendRequest({ action: 'preferences.get', key: key }, callback);
};

GoogleChromePreferences.prototype.nativePut = function(key, value) {
  chrome.extension.sendRequest({ action: 'preferences.put', key: key, value: value });
  return value;
};
