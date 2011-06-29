SafariExtension = function(doc) {
  this.doc = doc;
  this.klass = SafariExtension;
  this.tracker = SafariTracker;
};
SafariExtension.prototype = new Careplane();

SafariExtension.prefs = new SafariPreferences();

SafariExtension.log = function(str) {
  console.log(str);
};

SafariExtension.load = function() {
  var extension = new SafariExtension(window.document);
  extension.loadDriver(ExtensionLoader.driverLoaded(extension));
};

SafariExtension.prototype.openWelcomeScreen = function() {
  safari.self.tab.dispatchMessage('welcome');
};
  
SafariExtension.prototype.notify = function(driver) {
  // not sure if we want to use desktop notifications for this, no real alternative
};

SafariExtension.prototype.addStyleSheet = function() {
  // this is handled by Info.plist
};




SafariExtension.load();
