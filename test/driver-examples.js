var helper = require('./helper'),
    assert = helper.assert,
    sinon = helper.sinon,
    plugin = helper.plugin,
    Careplane = plugin.require('./careplane');

module.exports = function(driverClass, fixtureFile) {
  return {
    '#load': {
      'polls the page for updates': sinon.test(function() {
        var spy = this.spy;
        helper.qweryFixture(fixtureFile, function(err, $, window) {
          var extension = new Careplane(window);
          var driver = new driverClass(extension);
          spy(driver.events, 'loadPoller');
          driver.prepare = function() {};
          driver.load();
          sinon.assert.called(driver.events.loadPoller);
        });
      })
    }
  };
};
