Careplane = function() {};

Careplane.setCurrentExtension = function(extension) {
  Careplane.currentExtension = extension;
};

Careplane.prototype.eligableDrivers = function() {
  if(!this._eligableDrivers) {
    this._eligableDrivers = [Kayak, Orbitz].filter(Util.proxy(function(driver) {
      var driverEnabled = this.prefs.get('sites.' + driver.driverName) == 'true';
      return driverEnabled && driver.shouldMonitor(this.doc.location.href);
    }, this));
  }

  return this._eligableDrivers;
};

Careplane.prototype.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';

Careplane.prototype.isActive = function() {
  return this.eligableDrivers().length > 0;
};

Careplane.prototype.loadDriver = function() {
  var drivers = this.eligableDrivers();
  if(drivers.length > 0) {
    var driver = new drivers[0](this);
    driver.load();
  }
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
