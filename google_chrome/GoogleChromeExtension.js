GoogleChromeExtension = function(doc) {
  this.doc = doc;
  this.klass = GoogleChromeExtension;
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
  chrome.extension.sendRequest({action : 'notify', driver: driver});
};

GoogleChromeExtension.prototype.addStyleSheet = function() {
  // this is handled by manifest.json
};
