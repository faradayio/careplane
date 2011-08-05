var Careplane = require('../../Careplane');
var GoogleChromeTracker = require('./GoogleChromeTracker');
var GoogleChromePreferences = require('./GoogleChromePreferences');

var GoogleChromeExtension = function(doc) {
  this.doc = doc;
  this.klass = GoogleChromeExtension;
  this.tracker = GoogleChromeTracker;
  this.prefs = new GoogleChromePreferences();
};
GoogleChromeExtension.prototype = new Careplane();

GoogleChromeExtension.load = function() {
  var extension = new GoogleChromeExtension(window.document);
  extension.loadDriver();
  return extension;
};

GoogleChromeExtension.log = function(str) {
  console.log(str);
};
  
GoogleChromeExtension.prototype.notify = function(driver) {
  // not sure if we want to use desktop notifications for this, no real alternative
};

GoogleChromeExtension.prototype.addStyleSheet = function() {
  // this is handled by manifest.json
};

module.exports = GoogleChromeExtension;
