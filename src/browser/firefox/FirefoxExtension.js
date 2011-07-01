FirefoxExtension = function(doc) {
  this.doc = doc;
  this.klass = FirefoxExtension;
  this.tracker = FirefoxTracker;
};
FirefoxExtension.prototype = new Careplane();

FirefoxExtension.events = {
  loadStylesheet: function(extension) {
    return function(url) {
      var style = extension.doc.createElement('link');
      style.setAttribute('rel','stylesheet');
      style.setAttribute('type','text/css');
      console.log(self);
      style.setAttribute('href', url);
      extension.doc.head.appendChild(style);
    };
  },

  loadDriver: function(extension) {
    return function(driver) {
      var driverClass;
      switch(driver) {
        case 'Hipmunk':
          driverClass = Hipmunk;
          break;
        case 'Kayak':
          driverClass = Kayak;
          break;
        case 'Orbitz':
          driverClass = Orbitz;
          break;
      }
      console.log('want to load ' + driver);
      if(extension.driverShouldMonitor(driverClass, extension.doc)) {
        console.log('driver ' + driver + ' enabled');
        var driverInstance = new driverClass(extension);
        Careplane.setCurrentDriver(driverInstance);
        driverInstance.load();
      }
    };
  }
};

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

FirefoxExtension.prototype.loadDriver = function() {
  self.port.on('driver.load', FirefoxExtension.events.loadDriver(this), false);
  self.port.on('stylesheet.load', FirefoxExtension.events.loadStylesheet(this), false);
};
