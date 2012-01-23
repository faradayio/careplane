require('./helper');

vows.describe('SafariTracker').addBatch({
  var SafariTracker = require('browser/safari/safari-tracker');

  '.sendRequest': {
    'sends a message to the worker': function() {
      spyOn(safari.self.tab, 'dispatchMessage');
      SafariTracker.sendRequest('mymessage', { color: 'purple' });
      expect(safari.self.tab.dispatchMessage).
        toHaveBeenCalledWith('mymessage', { color: 'purple' });
    });
  });
});
