Preferences = function() {};

Preferences.prototype.get = function(key, defaultValue) {
  var value = this.nativeGet('careplane.' + key);
  if(value == null && defaultValue) {
    value = defaultValue();
    this.nativePut('careplane.' + key, value);
  }

  return value;
};

Preferences.prototype.put = function(key, value) {
  this.nativePut('careplane.' + key, value);
  return value;
};
