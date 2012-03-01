var Careplane = require('../../careplane');
var SafariTracker = require('./safari-tracker');
var SafariPreferences = require('./safari-preferences');

var SafariExtension = function(doc) {
  this.doc = doc;
  this.klass = SafariExtension;
  this.tracker = SafariTracker;
  this.prefs = new SafariPreferences();
};
SafariExtension.prototype = new Careplane();

SafariExtension.load = function() {
  var extension = new SafariExtension(window.document);
  extension.init();
  extension.loadDriver();
  return extension;
};

module.exports = SafariExtension;
