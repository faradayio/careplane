var $ = require('jquery-browserify');

var Hipmunk = require('../../drivers/Hipmunk');
var Kayak = require('../../drivers/Kayak');
var KayakUK = require('../../drivers/KayakUK');
var Orbitz = require('../../drivers/Orbitz');

var CucumberPreferences = require('./CucumberPreferences');

var Careplane = require('../../Careplane');

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
