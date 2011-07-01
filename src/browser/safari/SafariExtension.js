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
  extension.loadDriver(ExtensionLoader.driverLoaded(extension));
};

SafariExtension.prototype.notify = function(driver) {
  // not sure if we want to use desktop notifications for this, no real alternative
};

SafariExtension.prototype.addStyleSheet = function() {
  // this is handled by Info.plist
};



if(!jasmine) {
  SafariExtension.load();
}
