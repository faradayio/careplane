FirefoxPreferences = function() {
  this.prefService = Components.classes["@mozilla.org/preferences-service;1"].
    getService(Components.interfaces.nsIPrefService).
    getBranch("extensions.careplane.");
};
FirefoxPreferences.prototype = new Preferences();

FirefoxPreferences.prototype.nativeGet = function(key, defaultValue) {
  return this.prefService.getCharPref(key);
};

FirefoxPreferences.prototype.nativePut = function(key, value) {
  this.prefService.setCharPref(key, value);
};
