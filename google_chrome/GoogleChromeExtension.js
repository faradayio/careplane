GoogleChromeExtension = function(doc) {
  this.doc = doc;
  this.klass = GoogleChromeExtension;
};
GoogleChromeExtension.prototype = new Careplane();

GoogleChromeExtension.prefs = new GoogleChromePreferences();

GoogleChromeExtension.fetch = function(url, callback) {
  Util.fetch(url, callback);
  //chrome.extension.sendRequest({'action': 'fetch', 'url': url}, callback);
};

GoogleChromeExtension.logger = function() {
  return Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
};

GoogleChromeExtension.log = function(str) {
  GoogleChromeExtension.logger().logStringMessage(str);
};

GoogleChromeExtension.prototype.prefs = function() {
  return GoogleChromeExtension.prefs;
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
