describe('Preferences', function() {
  var preferences;
  beforeEach(function() {
    preferences = new Preferences();
  });

  describe('#get', function() {
    it('provides an existing preference to a given callback', function() {
      preferences.nativeGet = function(key, callback) { callback('awesome'); };
      var result;
      preferences.get('foo', function(val) { result = val; }, 'lame');
      expect(result).toBe('awesome');
    });
    it('sends null to the callback if the preference is not set', function() {
      preferences.nativeGet = function(key, callback) { return callback(null); };
      var result;
      preferences.get('foo', function(val) { result = val; });
      expect(result).toBe(null);
    });
    it('stores a default value for an undefined preference if a default is set', function() {
      preferences.nativeGet = function(key, callback) { callback(null); };
      var result;
      preferences.get('foo', function(val) { result = val; }, 'cool');
      expect(result).toBe('cool');
    });
  });
});
