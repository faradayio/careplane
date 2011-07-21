describe('SafariTracker', function() {
  describe('.sendRequest', function() {
    it('sends a message to the worker', function() {
      spyOn(safari.self.tab, 'dispatchMessage');
      SafariTracker.sendRequest('mymessage', { color: 'purple' });
      expect(safari.self.tab.dispatchMessage).
        toHaveBeenCalledWith('mymessage', { color: 'purple' });
    });
  });
});
