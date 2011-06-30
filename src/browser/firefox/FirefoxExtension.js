FirefoxExtension = function(doc) {
  this.doc = doc;
  this.klass = FirefoxExtension;
  this.tracker = FirefoxTracker;
  this.prefs = new FirefoxPreferences();
};
FirefoxExtension.prototype = new Careplane();

FirefoxExtension.log = function(str) {
  console.log(str);
};
 
FirefoxExtension.prototype.notify = function(driver) {
  //var nb = gBrowser.getNotificationBox();
  //var n = nb.getNotificationWithValue('careplane');
  //var message = 'Careplane is calculating the carbon footprint of your ' + driver.driverName() + ' flight search results.'; 
  //if(n) {
    //n.label = message;
  //} else {
    //const priority = nb.PRIORITY_INFO_LOW;
    //nb.appendNotification(message, 'careplane', null, priority, [{accessKey: 'H', callback: CareplaneEvents.hideEmissionEstimates(this.doc), label: 'Hide footprints'}]);
  //}
};

FirefoxExtension.prototype.addStyleSheet = function() {
  var style = this.doc.createElement('link');
  style.setAttribute('rel','stylesheet');
  style.setAttribute('type','text/css');
  style.setAttribute('href',self.data.url('careplane.css'));
  this.doc.head.appendChild(style);
};
