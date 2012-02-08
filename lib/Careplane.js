var $ = require('jquery');
var CareplaneEvents = require('./careplane-events');

var Bing = require('./drivers/bing');
var Hipmunk = require('./drivers/hipmunk');
var Kayak = require('./drivers/kayak');
var KayakUK = require('./drivers/kayak-uk');
var Orbitz = require('./drivers/orbitz');

var Careplane = function() {};

Careplane.prototype.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';
  
Careplane.prototype.insertBadge = function(parentElement, referenceElement, className) {
  var badge = $('<div class="brighter_planet_cm1_badge"><p><a href="http://brighterplanet.com"><span class="setup">Carbon powered by</span> <span class="punchline">Brighter Planet</span></a></p></div>');

  if(referenceElement) {
    referenceElement.before(badge);
  } else {
    parentElement.append(badge);
  }

  if(className) badge.addClass(className);
};

Careplane.prototype.fetch = function(url, callback) {
  if(!options) options = {};
  $.extend(options, {
    url: url,
    data: params,
    success: callback
  });

  $.ajax(options);
};

Careplane.prototype.log = function(str) {
  this.klass.log(str);
};

Careplane.prototype.isPollingEnabled = true;

Careplane.prototype.driverShouldMonitor = function(driverClass, doc) {
  var match = doc.location.href.match(driverClass.monitorURL);

  if(driverClass.monitorExcludeURL) {
    var staticMatch = doc.location.href.match(driverClass.monitorExcludeURL);
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