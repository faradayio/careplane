describe('FirefoxWorker', function() {
  var worker;
  beforeEach(function() {
    worker = new FirefoxWorker();
  });

  describe('#messageHandler', function() {
    it('dispatches a message to #processMessage', function() {
      var messageHandler = this.worker.messageHandler(worker, 'preferences.put');
      spyOn(worker, 'setPreference');
      messageHandler({ key: 'abc123', value: 'foobar' });
      expect(worker.setPreference).
        toHaveBeenCalledWith('abc123', 'foobar');
    });
  });
});

describe('GoogleChromeWorker', function() {
  var worker;
  beforeEach(function() {
    worker = new GoogleChromeWorker();
  });

  describe('#handleMessage', function() {
    it('dispatches a message to #processMessage', function() {
      worker.handleMessage({ action: 'preferences.put', key: 'abc123', value: 'foobar' });
      expect(worker.setPreference).
        toHaveBeenCalledWith('abc123', 'foobar');
    });
  });
});

describe('SafariWorker', function() {
  var worker;
  beforeEach(function() {
    worker = new SafariWorker();
  });

  describe('#handleMessage', function() {
    it('dispatches a message to #processMessage', function() {
      worker.handleMessage({ name: 'preferences.put',
        message: { key: 'abc123', value: 'foobar' } });
      expect(worker.setPreference).
        toHaveBeenCalledWith('abc123', 'foobar');
    });
  });
});
