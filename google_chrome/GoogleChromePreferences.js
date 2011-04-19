GoogleChromePreferences = function() {};
GoogleChromePreferences.prototype = new Preferences();

GoogleChromePreferences.prototype.nativeGet = function(key) {
  return localStorage['careplane.' + key];
};

GoogleChromePreferences.prototype.nativePut = function(key, value) {
  localStorage['careplane.' + key] = value;
};
