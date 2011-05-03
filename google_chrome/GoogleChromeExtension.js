GoogleChromeExtension = function(doc) {
  this.doc = doc;
  this.klass = GoogleChromeExtension;
  this.tracker = Tracker(doc);
};
GoogleChromeExtension.prototype = new Careplane();

GoogleChromeExtension.prefs = new GoogleChromePreferences();

GoogleChromeExtension.log = function(str) {
  console.log(str);
};

GoogleChromeExtension.prototype.openWelcomeScreen = function() {
  chrome.extension.sendRequest({action : 'welcome'});
};
  
GoogleChromeExtension.prototype.notify = function(driver) {
  // not sure if we want to use desktop notifications for this, no real alternative
};

GoogleChromeExtension.prototype.addStyleSheet = function() {
  // this is handled by manifest.json
};
