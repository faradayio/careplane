var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var Worker = helper.plugin.require('./worker');

vows.describe('Worker').addBatch({
  '#getPreference': {
    topic: function() {
      var worker = new Worker();
      worker.preferences = {};
      return worker;
    },

    'retrieves a preference': function(worker) {
      worker.preferences['shazbot'] = 'for real'

      assert.equal(worker.getPreference({ key: 'shazbot' }), 'for real');
    },
    'retrieves a boolean preference': function(worker) {
      worker.preferences['cool'] = true;

      assert.isTrue(worker.getPreference({ key: 'cool' }));
    },
    'retrieves an unset preference as null': function(worker) {
      assert.isUndefined(worker.getPreference({ key: 'bad' }));
    },
    'sets a default value if one is given': function(worker) {
      assert.equal(worker.getPreference({
        key: 'not defined',
        defaultValue: 'strange'
      }), 'strange');
    },
    'executes a callback if given': function(worker) {
      worker.sendCallback = function() {};
      sinon.spy(worker, 'sendCallback');
      worker.getPreference({
        key: 'dontcallme',
        callbackId: 'illcallyou'
      });
      assert.called(worker.sendCallback);
    }
  }
}).export(module);
