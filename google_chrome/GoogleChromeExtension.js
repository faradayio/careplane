GoogleChromeExtension = function(doc) {
  this.doc = doc;
  this.prefs = new GoogleChromePreferences();
};
GoogleChromeExtension.prototype = new Careplane();

GoogleChromeExtension.fetch = function(url, callback) {
  chrome.extension.sendRequest({'action' : 'fetch'}, url, callback);
};

GoogleChromeExtension.logger = function() {
  return Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
};

GoogleChromeExtension.log = function(str) {
  GoogleChromeExtension.logger().logStringMessage(str);
};

GoogleChromeExtension.prototype.log = function(str) {
  GoogleChromeExtension.log(str);
};

GoogleChromeExtension.prototype.welcome = function() {
  if(this.prefs.get('hasRunPreviously') != 'true') {
    this.prefs.put('hasRunPreviously', 'true');

    chrome.extension.sendRequest({'action' : 'welcome'});
  }
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
