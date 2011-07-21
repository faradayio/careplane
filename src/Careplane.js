Careplane = function() {};

Careplane.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';
  
Careplane.insertBadge = function(parentElement, referenceElement, badgeStyles) {
  var badge = $('<div class="brighter_planet_cm1_badge"><p><a href="http://brighterplanet.com"><span class="setup">Carbon powered by</span> <span class="punchline">Brighter Planet</span></a></p></div>');

  if(referenceElement) {
    referenceElement.before(badge);
  } else {
    parentElement.append(badge);
  }

  if(badgeStyles) {
    for(var name in badgeStyles) {
      badge.css(name, badgeStyles[name]);
    }
  }

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
  Careplane.currentExtension = this;
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
        Careplane.currentDriver = new driverClass(extension);
        Careplane.currentDriver.load();
      }
    };
  },

  hideEmissionEstimates: function(doc) {
    return function() {
      $('.careplane-footprint', doc).hide();
    };
  }
}
