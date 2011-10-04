sharedExamplesFor('polling Driver', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var Careplane = require('careplane');

  describe('Load', function() {
    it('polls when using a non-testing extension', function() {
      var extension = new Careplane();
      extension.doc = {
        location: {
          href: ''
        }
      };
      var driver = new this.driverClass(extension);
      spyOn(driver.events, 'loadPoller');
      driver.prepare = function() {};
      driver.load();
      expect(driver.events.loadPoller).toHaveBeenCalled();
    });
    it('does not poll when using a testing extension', function() {
      var extension = new JasmineExtension();
      extension.doc = {
        location: {
          href: ''
        }
      };
      var driver = new this.driverClass(extension);
      spyOn(driver.atc, 'clear');
      driver.prepare = function() {};
      driver.load();
      expect(driver.atc.clear).toHaveBeenCalled();
    });
  });
});

sharedExamplesFor('non-polling Driver', function() {
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var Careplane = require('careplane');

  describe('Load', function() {
    it('does not poll when using a non-testing extension', function() {
      var extension = new Careplane();
      extension.doc = {
        location: {
          href: ''
        }
      };
      var driver = new this.driverClass(extension);
      spyOn(driver.atc, 'clear');
      driver.prepare = function() {};
      driver.load();
      expect(driver.atc.clear).toHaveBeenCalled();
    });
    it('does not poll when using a testing extension', function() {
      var extension = new JasmineExtension();
      extension.doc = {
        location: {
          href: ''
        }
      };
      var driver = new this.driverClass(extension);
      spyOn(driver.atc, 'clear');
      driver.prepare = function() {};
      driver.load();
      expect(driver.atc.clear).toHaveBeenCalled();
    });
  });
});
