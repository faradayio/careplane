var Careplane = require('../../careplane');
var GoogleChromeTracker = require('./google-chrome-tracker');
var GoogleChromePreferences = require('./google-chrome-preferences');

var GoogleChromeExtension = function(doc) {
  this.doc = doc;
  this.klass = GoogleChromeExtension;
  this.tracker = GoogleChromeTracker;
  this.prefs = new GoogleChromePreferences();
};
GoogleChromeExtension.prototype = new Careplane();

GoogleChromeExtension.load = function() {
  var extension = new GoogleChromeExtension(window.document);
  extension.init();
  extension.loadDriver();
  return extension;
};

GoogleChromeExtension.prototype.notify = function(driver) {
  // not sure if we want to use desktop notifications for this, no real alternative
};

GoogleChromeExtension.prototype.addStyleSheet = function() {
  // this is handled by manifest.json
};

module.exports = GoogleChromeExtension;
