Careplane = function() {};

Careplane.prototype.drivers = function() { return [Kayak, Orbitz]; };
Careplane.prototype.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';

Careplane.prototype.onPageLoad = function() {
  if(this.firstRun)
    this.firstRun();

  var doc = ev.originalTarget;
  var matchingDrivers = this.drivers().filter(function(driver) {
    var driverName = driver.driverName.toLowerCase();
    var driverEnabled = this.prefs.getBoolPref(driverName);
    return driverEnabled && driver.shouldMonitor(doc.location.href);
  });
  if(matchingDrivers.length > 0) {
    var matchingDriver = new matchingDrivers[0](this, doc);
    matchingDriver.load();
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
