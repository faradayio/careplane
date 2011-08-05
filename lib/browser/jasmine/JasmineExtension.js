var Hipmunk = require('../../drivers/Hipmunk');
var Kayak = require('../../drivers/Kayak');
var KayakUK = require('../../drivers/KayakUK');
var Orbitz = require('../../drivers/Orbitz');

var JasminePreferences = require('./JasminePreferences');

var Careplane = require('../../Careplane');

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
  this.urlMap = {};
};
JasmineExtension.prototype = new Careplane();

JasmineExtension.prototype.fetch = function(url, callback) {
  for(var pattern in this.urlMap) {
    var regex = new RegExp(pattern);
    if(regex.test(url)) {
      callback(this.urlMap[pattern]);
      return;
    }
  }
  JasmineExtension.log("JasmineExtension.fetch doesn't know what to do with URL " + url);
};

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
