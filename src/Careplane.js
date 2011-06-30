Careplane = function() {};

Careplane.setCurrentExtension = function(extension) {
  Careplane.currentExtension = extension;
};

Careplane.setCurrentDriver = function(driver) {
  Careplane.currentDriver = driver;
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

Careplane.prototype.isPollingEnabled = true;

Careplane.prototype.driverShouldMonitor = function(driverClass, doc) {
  var match = doc.location.href.search(driverClass.monitorURL);

  if(driverClass.monitorExcludeURL) {
    var staticMatch = doc.location.href.search(driverClass.monitorExcludeURL);
    return match >=0 && staticMatch < 0;
  } else {
    return match >=0;
  }
};

Careplane.prototype.loadDriver = function() {
  Careplane.setCurrentExtension(this);
  var extension = this;
  [Hipmunk, Kayak, Orbitz].forEach(function(driver) {
    if(extension.driverShouldMonitor(driver, extension.doc)) {
      extension.prefs.getBoolean('sites.' + driver.driverName,
                            CareplaneEvents.driverBecomesAvailable(extension, driver),
                            true);
    }
  });
};



CareplaneEvents = {
  driverBecomesAvailable: function(extension, driverClass) {
    return function(driverEnabled) {
      if(driverEnabled) {
        var driver = new driverClass(extension);
        Careplane.setCurrentDriver(driver);
        driver.load();
      }
    };
  },

  hideEmissionEstimates: function(doc) {
    return function() {
      $('.careplane-footprint', doc).hide();
    };
  }
}
