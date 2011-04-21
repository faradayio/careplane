GoogleChromeExtension = function(doc) {
  this.doc = doc;
};
GoogleChromeExtension.prototype = new Careplane();

GoogleChromeExtension.prefs = new GoogleChromePreferences();

GoogleChromeExtension.fetch = function(url, callback) {
  chrome.extension.sendRequest({'action': 'fetch', 'url': url}, callback);
};

GoogleChromeExtension.logger = function() {
  return Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
};

GoogleChromeExtension.log = function(str) {
  GoogleChromeExtension.logger().logStringMessage(str);
};

GoogleChromeExtension.prototype.fetch = function(url, callback) {
  GoogleChromeExtension.fetch(url, callback);
};

GoogleChromeExtension.prototype.log = function(str) {
  GoogleChromeExtension.log(str);
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
  var style = this.doc.createElement('link');
  style.setAttribute('rel','stylesheet');
  style.setAttribute('type','text/css');
  style.setAttribute('href','resource://careplanestyle/careplane.css');
  this.doc.head.appendChild(style);
};
