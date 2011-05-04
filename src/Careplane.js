Careplane = function() {};

Careplane.setCurrentExtension = function(extension) {
  Careplane.currentExtension = extension;
};

Careplane.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';
  
Careplane.insertBadge = function(doc, parentElement, referenceElement, badgeStyle) {
  var styleElement = doc.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.innerHTML = '.brighter_planet_cm1_badge { ' + badgeStyle + ' }';
  parentElement.insertBefore(styleElement, referenceElement);
  var brandingElement = doc.createElement('script');
  brandingElement.setAttribute('src', 'http://carbon.brighterplanet.com/badge.js');
  brandingElement.setAttribute('type', 'text/javascript');
  parentElement.insertBefore(brandingElement, referenceElement);
};

Careplane.fetch = function(url, callback) {
  $.ajax({
    url: url,
    success: callback
  });
};

Careplane.prototype.log = function(str) {
  this.klass.log(str);
};

Careplane.prototype.prefs = function() {
  return this.klass.prefs;
};

Careplane.prototype.welcome = function() {
  this.prefs().getBoolean('hasRunPreviously', CareplaneEvents.welcome(this), false);
};

Careplane.prototype.loadDriver = function(callback) {
  var careplane = this;
  [Hipmunk, Kayak, Orbitz].filter(function(driver) {
    if(driver.shouldMonitor(careplane.doc)) {
      careplane.prefs().getBoolean('sites.' + driver.driverName,
                            CareplaneEvents.driverBecomesAvailable(careplane, driver, callback),
                            true);
    }
  });
};



CareplaneEvents = {
  driverBecomesAvailable: function(extension, driverClass, callback) {
    return function(driverEnabled) {
      if(driverEnabled) {
        callback();
        var driver = new driverClass(extension);
        driver.load();
      }
    };
  },

  welcome: function(extension) {
    return function(hasRunPreviously) {
      if(!hasRunPreviously) {
        extension.prefs().putBoolean('hasRunPreviously', true);

        extension.tracker.firstRun();
        extension.openWelcomeScreen();
      }
    };
  },

  hideEmissionEstimates: function(doc) {
    return function() {
      $('.careplane-footprint', doc).hide();
    };
  }
}
