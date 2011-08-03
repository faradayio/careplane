var Careplane = require('../../Careplane');
var SafariTracker = require('./SafariTracker');
var SafariPreferences = require('./SafariPreferences');

SafariExtension = function(doc) {
  this.doc = doc;
  this.klass = SafariExtension;
  this.tracker = SafariTracker;
  this.prefs = new SafariPreferences();
};
SafariExtension.prototype = new Careplane();

SafariExtension.log = function(str) {
  console.log(str);
};

SafariExtension.load = function() {
  var extension = new SafariExtension(window.document);
  extension.loadDriver();
};

module.exports = SafariExtension;
