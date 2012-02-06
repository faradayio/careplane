var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

vows.describe('Worker').addBatch({
  var Worker = require('worker');

  '#getPreference': {
    var worker;
    beforeEach(function() {
      worker = new Worker();
      worker.preferences = {};
    });

    'retrieves a preference': function() {
      worker.preferences['shazbot'] = 'for real'

      expect(worker.getPreference({ key: 'shazbot' })).toBe('for real');
    });
    'retrieves a boolean preference': function() {
      worker.preferences['cool'] = true;

      expect(worker.getPreference({ key: 'cool' })).toBeTruthy();
    });
    'retrieves an unset preference as null': function() {
      expect(worker.getPreference({ key: 'bad' })).not.toBeDefined();
    });
    'sets a default value if one is given': function() {
      expect(worker.getPreference({
        key: 'not defined',
        defaultValue: 'strange'
      })).toBe('strange');
    });
    'executes a callback if given': function() {
      worker.sendCallback = function() {};
      spyOn(worker, 'sendCallback');
      worker.getPreference({
        key: 'dontcallme',
        callbackId: 'illcallyou'
      });
      expect(worker.sendCallback).toHaveBeenCalled();
    });
  });
});
