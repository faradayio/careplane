var Hipmunk = require('../../drivers/Hipmunk');
var Kayak = require('../../drivers/Kayak');
var KayakUK = require('../../drivers/KayakUK');
var Orbitz = require('../../drivers/Orbitz');

var TestPreferences = require('./TestPreferences');

var Careplane = require('../../Careplane');

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
  this.urlMap = {};
};
TestExtension.prototype = new Careplane();

TestExtension.prototype.fetch = function(url, callback) {
  for(var pattern in this.urlMap) {
    var regex = new RegExp(pattern);
    if(regex.test(url)) {
      callback(this.urlMap[pattern]);
      return;
    }
  }
  TestExtension.log("TestExtension.fetch doesn't know what to do with URL " + url);
};

TestExtension.log = function(str) {
  if(typeof console != 'undefined') {
    console.log(str);
  } else if(typeof jasmine != 'undefined') {
    jasmine.log(str);
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
