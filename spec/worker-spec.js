describe('Worker', function() {
  var Worker = require('worker').Worker;

  describe('#getPreference', function() {
    var worker;
    beforeEach(function() {
      worker = new Worker();
      worker.preferences = {};
    });

    it('retrieves a preference', function() {
      worker.preferences['shazbot'] = 'for real'

      expect(worker.getPreference({ key: 'shazbot' })).toBe('for real');
    });
    it('retrieves a boolean preference', function() {
      worker.preferences['cool'] = true;

      expect(worker.getPreference({ key: 'cool' })).toBeTruthy();
    });
    it('retrieves an unset preference as null', function() {
      expect(worker.getPreference({ key: 'bad' })).not.toBeDefined();
    });
    it('sets a default value if one is given', function() {
      expect(worker.getPreference({
        key: 'not defined',
        defaultValue: 'strange'
      })).toBe('strange');
    });
    it('executes a callback if given', function() {
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
