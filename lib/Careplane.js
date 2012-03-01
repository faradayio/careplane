var Bing = require('./drivers/bing'),
    CareplaneEvents = require('./careplane-events'),
    Hipmunk = require('./drivers/hipmunk'),
    Kayak = require('./drivers/kayak'),
    KayakUK = require('./drivers/kayak-uk'),
    Orbitz = require('./drivers/orbitz');

var Careplane = function(doc) {
  this.doc = doc;
  this.$ = require('jquery').create(this.doc);
};

Careplane.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';

Careplane.url = function() {
  return this.doc.location.href;
};

Careplane.prototype.log = function(str) {
  this.klass.log(str);
};

Careplane.prototype.isPollingEnabled = true;

Careplane.prototype.driverShouldMonitor = function(driverClass) {
  var match = this.doc.location.href.match(driverClass.monitorURL);

  if(driverClass.monitorExcludeURL) {
    var staticMatch = this.doc.location.href.match(driverClass.monitorExcludeURL);
    return match && staticMatch == null;
  } else {
    return match != null;
  }
};

Careplane.prototype.loadDriver = function() {
  var extension = this;
  [Bing, Hipmunk, Kayak, KayakUK, Orbitz].forEach(function(driver) {
    if(extension.driverShouldMonitor(driver, extension.doc)) {
      extension.prefs.getBoolean('sites.' + driver.driverName,
                            CareplaneEvents.driverBecomesAvailable(extension, driver),
                            true);
    }
  });
};

module.exports = Careplane;
