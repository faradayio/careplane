Careplane = function() {};

Careplane.setCurrentExtension = function(extension) {
  Careplane.currentExtension = extension;
};

Careplane.prototype.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';

Careplane.prototype.welcome = function() {
  this.prefs().get('hasRunPreviously', CareplaneEvents.welcome(this));
};

Careplane.prototype.loadDriver = function(callback) {
  var careplane = this;
  [Hipmunk, Kayak, Orbitz].filter(function(driver) {
    if(driver.shouldMonitor(careplane.doc.location.href)) {
      careplane.prefs().get('sites.' + driver.driverName,
                          CareplaneEvents.driverBecomesAvailable(driver, callback));
    }
  });
};
  
Careplane.prototype.insertBadge = function(doc, parentElement, referenceElement, badgeStyle) {
  var styleElement = doc.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.innerHTML = '.brighter_planet_cm1_badge { ' + badgeStyle + ' }';
  parentElement.insertBefore(styleElement, referenceElement);
  var brandingElement = doc.createElement('script');
  brandingElement.setAttribute('src', 'http://carbon.brighterplanet.com/badge.js');
  brandingElement.setAttribute('type', 'text/javascript');
  parentElement.insertBefore(brandingElement, referenceElement);
};



CareplaneEvents = {
  driverBecomesAvailable: function(driverClass, callback) {
    return function(driverEnabled) {
      if(driverEnabled == 'true') {
        callback();
        var driver = new driverClass();
        driver.load();
      }
    };
  },

  welcome: function(extension) {
    return function(hasRunPreviously) {
      if(hasRunPreviously != 'true') {
        extension.prefs().put('hasRunPreviously', 'true');

        extension.openWelcomeScreen();
      }
    };
  }
}
