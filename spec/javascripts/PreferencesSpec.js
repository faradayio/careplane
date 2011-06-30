describe('Preferences', function() {
  var preferences;
  beforeEach(function() {
    preferences = new Preferences();
    preferences.callbacks = [];
  });

  describe('#get', function() {
    it('provides an existing preference to a given callback', function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId]('awesome'); };
      var result;
      preferences.get('foo', function(val) { result = val; }, 'lame');
      expect(result).toBe('awesome');
    });
    it('sends null to the callback if the preference is not set', function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](null); };
      var result;
      preferences.get('foo', function(val) { result = val; });
      expect(result).toBeNull();
    });
  });
  describe('#getBoolean', function() {
    it('provides an existing preference to a given callback', function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](true); };
      var result;
      preferences.getBoolean('foo', function(val) { result = val; }, 'lame');
      expect(result).toBeTruthy();
    });
    it('provides an false preference to a given callback', function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](false); };
      var result;
      preferences.getBoolean('foo', function(val) { result = val; }, 'lame');
      expect(result).toBeFalsy();
    });
    it('sends false to the callback if the preference is not set', function() {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](null); };
      var result;
      preferences.getBoolean('foo', function(val) { result = val; });
      expect(result).toBeFalsy()
    });
  });
});
