FirefoxExtension = function(doc) {
  this.doc = doc;
  this.prefs = new FirefoxPreferences();
};
FirefoxExtension.prototype = new Careplane();

FirefoxExtension.fetch = function(url, callback) {
  Util.fetch(url, callback);
};

FirefoxExtension.logger = function() {
  return Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
};

FirefoxExtension.log = function(str) {
  FirefoxExtension.logger().logStringMessage(str);
};

FirefoxExtension.prototype.log = function(str) {
  FirefoxExtension.log(str);
};

FirefoxExtension.prototype.welcome = function() {
  if(this.prefs.get("firstrun") == 'true') {
    this.prefs.put("firstrun",false);
 
    window.setTimeout(function(){
      gBrowser.selectedTab = gBrowser.addTab('http://careplane.org');
    }, 1500); //Firefox 2 fix - or else tab will get closed
  }
};
  
FirefoxExtension.prototype.notify = function(driver) {
  var nb = gBrowser.getNotificationBox();
  var n = nb.getNotificationWithValue('careplane');
  var message = 'Careplane is calculating the carbon footprint of your ' + driver.driverName + ' flight search results.'; 
  if(n) {
    n.label = message;
  } else {
    const priority = nb.PRIORITY_INFO_LOW;
    nb.appendNotification(message, 'careplane', null, priority, [{accessKey: 'H', callback: this.hideEmissionEstimates, label: 'Hide footprints'}]);
  }
};

FirefoxExtension.prototype.addStyleSheet = function() {
  var style = this.doc.createElement('link');
  style.setAttribute('rel','stylesheet');
  style.setAttribute('type','text/css');
  style.setAttribute('href','resource://careplanestyle/careplane.css');
  this.doc.head.appendChild(style);
};
