var helper = require('./helper'),
    assert = helper.assert,
    sinon = helper.sinon,
    plugin = helper.plugin,
    Careplane = plugin.require('./careplane');

module.exports.pollingDriver = function(driverClass) {
  return {
    '#load': {
      'polls the page for updates': function() {
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
      }
    }
  };
};
