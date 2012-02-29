var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var Preferences = helper.plugin.require('./preferences');

vows.describe('Preferences').addBatch({
  '#get': {
    topic: function() {
      prefs = new Preferences();
      prefs.callbacks = [];
      return prefs;
    },

    'provides an existing preference to a given callback': function(preferences) {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId]('awesome'); };
      var result;
      preferences.get('foo', function(val) { result = val; }, 'lame');
      assert.equal(result, 'awesome');
    },
    'sends null to the callback if the preference is not set': function(preferences) {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](null); };
      var result;
      preferences.get('foo', function(val) { result = val; });
      assert.isNull(result);
    }
  },

  '#getBoolean': {
    topic: function() {
      prefs = new Preferences();
      prefs.callbacks = [];
      return prefs;
    },

    'provides an existing preference to a given callback': function(preferences) {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](true); };
      var result;
      preferences.getBoolean('foo', function(val) { result = val; }, 'lame');
      assert.isTrue(result);
    },
    'provides an false preference to a given callback': function(preferences) {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](false); };
      var result;
      preferences.getBoolean('foo', function(val) { result = val; }, 'lame');
      assert.isFalse(result);
    },
    'sends false to the callback if the preference is not set': function(preferences) {
      preferences.nativeGet = function(key, callbackId) { preferences.callbacks[callbackId](null); };
      var result;
      preferences.getBoolean('foo', function(val) { result = val; });
      assert.isFalse(result);
    }
  }
}).export(module);
