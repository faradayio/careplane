Preferences = function() {};

Preferences.prototype.get = function(key, callback) {
  this.nativeGet(key, callback);
};

Preferences.prototype.put = function(key, value) {
  this.nativePut(key, value);
  return value;
};
