var $ = require('jquery');

var Hipmunk = require('../../drivers/hipmunk');
var Kayak = require('../../drivers/kayak');
var KayakUK = require('../../drivers/kayak-uk');
var Orbitz = require('../../drivers/orbitz');

var CucumberPreferences = require('./cucumber-preferences');

var Careplane = require('../../careplane');

var CucumberExtension = function(doc) {
  this.doc = doc;
  this.klass = CucumberExtension;
  this.tracker = {
    welcome: function() {},
    search: function() {},
    purchase: function() {},
    purchaseComparison: function() {}
  };
  this.prefs = new CucumberPreferences();
  this.urlMap = {};
};
CucumberExtension.prototype = new Careplane();

CucumberExtension.log = function(str) {
  if(!$('#loggz').get(0)) {
    $(window.document.body).append('<ul id="loggz"></ul>');
  }
  $('#loggz').append('<li>' + str + '</li>');
};

CucumberExtension.prototype.isPollingEnabled = false;

CucumberExtension.prototype.log = function(str) {
  CucumberExtension.log(str);
};

CucumberExtension.prototype.welcome = function() {
  CucumberExtension.log('Welcome!');
};
  
CucumberExtension.prototype.notify = function(driver) {
  CucumberExtension.log('Careplane is calculating the carbon footprint of your ' + driver.driverName() + ' flight search results.'); 
};

CucumberExtension.prototype.addStyleSheet = function() { /* NOOP */ };

module.exports = CucumberExtension;
