var helper = require('./helper'),
    assert = helper.assert,
    sinon = helper.sinon,
    plugin = helper.plugin,
    Careplane = plugin.require('./careplane'),
    TestExtension = plugin.require('./browser/test/test-extension');

module.exports.pollingDriver = function(driverClass) {
  return {
    'Load': {
      'polls when using a non-testing extension': function() {
        var extension = new Careplane();
        extension.doc = {
          location: {
            href: ''
          }
        };
        var driver = new driverClass(extension);
        sinon.spy(driver.events, 'loadPoller');
        driver.prepare = function() {};
        driver.load();
        assert(driver.events.loadPoller.called);
      },
      'does not poll when using a testing extension': function() {
        var extension = new TestExtension();
        extension.doc = {
          location: {
            href: ''
          }
        };
        var driver = new driverClass(extension);
        sinon.spy(driver.atc, 'clear');
        driver.prepare = function() {};
        driver.load();
        assert(driver.atc.clear.called);
      }
    }
  };
};

module.exports.nonPollingDriver = function(driverClass) {
  return {
    'Load': {
      'does not poll when using a non-testing extension': function() {
        var extension = new Careplane();
        extension.doc = {
          location: {
            href: ''
          }
        };
        var driver = new driverClass(extension);
        sinon.spy(driver.atc, 'clear');
        driver.prepare = function() {};
        driver.load();
        assert(driver.atc.clear.called);
      },
      'does not poll when using a testing extension': function() {
        var extension = new TestExtension();
        extension.doc = {
          location: {
            href: ''
          }
        };
        var driver = new driverClass(extension);
        sinon.spy(driver.atc, 'clear');
        driver.prepare = function() {};
        driver.load();
        assert(driver.atc.clear.called);
      }
    }
  };
};
