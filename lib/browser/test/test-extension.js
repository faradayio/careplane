var Hipmunk = require('../../drivers/hipmunk'),
    Kayak = require('../../drivers/kayak'),
    KayakUK = require('../../drivers/kayak-uk'),
    Orbitz = require('../../drivers/orbitz'),
    TestPreferences = require('./test-preferences'),
    Careplane = require('../../careplane');

var TestExtension = function(doc) {
  this.doc = doc;
  this.klass = TestExtension;
  this.tracker = {
    welcome: function() {},
    search: function() {},
    purchase: function() {},
    purchaseComparison: function() {}
  };
  this.prefs = new TestPreferences();
};
TestExtension.prototype = new Careplane();

TestExtension.log = function(str) {
  if(typeof console != 'undefined') {
    console.log(str);
  } else if(typeof capy != 'undefined') {
    capy.log(str);
  } else {
    throw 'Unable to log to anything';
  }
};

TestExtension.prototype.isPollingEnabled = false;

TestExtension.prototype.log = function(str) {
  TestExtension.log(str);
};

TestExtension.prototype.welcome = function() {
  TestExtension.log('Welcome!');
};
  
TestExtension.prototype.notify = function(driver) {
  TestExtension.log('Careplane is calculating the carbon footprint of your ' + driver.driverName() + ' flight search results.'); 
};

TestExtension.prototype.addStyleSheet = function() { /* NOOP */ };

module.exports = TestExtension;
