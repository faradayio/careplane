var helper = require('./helper'),
    assert = helper.assert,
    sinon = helper.sinon,
    plugin = helper.plugin,
    Careplane = plugin.require('./careplane');

module.exports = function(driverClass, fixtureFile) {
  return {
    '#load': {
      'polls the page for updates': function() {
        helper.qweryFixture(fixtureFile, function(err, $, window) {
          var extension = new Careplane(window);
          var driver = new driverClass(extension);
          sinon.spy(driver.events, 'loadPoller');
          driver.prepare = function() {};
          driver.load();
          assert(driver.events.loadPoller.called);
        });
      }
    }
  };
};
