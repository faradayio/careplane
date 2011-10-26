var Hipmunk = require('../../drivers/hipmunk');
var Kayak = require('../../drivers/kayak');
var KayakUK = require('../../drivers/kayak-uk');
var Orbitz = require('../../drivers/orbitz');

var JasminePreferences = require('./jasmine-preferences');

var Careplane = require('../../careplane');

var JasmineExtension = function(doc) {
  this.doc = doc;
  this.klass = JasmineExtension;
  this.tracker = {
    welcome: function() {},
    search: function() {},
    purchase: function() {},
    purchaseComparison: function() {}
  };
  this.prefs = new JasminePreferences();
};
JasmineExtension.prototype = new Careplane();

JasmineExtension.log = function(str) {
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

JasmineExtension.prototype.isPollingEnabled = false;

JasmineExtension.prototype.log = function(str) {
  JasmineExtension.log(str);
};

JasmineExtension.prototype.welcome = function() {
  JasmineExtension.log('Welcome!');
};
  
JasmineExtension.prototype.notify = function(driver) {
  JasmineExtension.log('Careplane is calculating the carbon footprint of your ' + driver.driverName() + ' flight search results.'); 
};

JasmineExtension.prototype.addStyleSheet = function() { /* NOOP */ };

module.exports = JasmineExtension;
