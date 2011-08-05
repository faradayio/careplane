var $ = require('jquery-browserify');
var CareplaneEvents = require('./CareplaneEvents');

var Bing = require('./drivers/Bing');
var Hipmunk = require('./drivers/Hipmunk');
var Kayak = require('./drivers/Kayak');
var KayakUK = require('./drivers/KayakUK');
var Orbitz = require('./drivers/Orbitz');

var Careplane = function() {};

Careplane.prototype.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';
  
Careplane.prototype.insertBadge = function(parentElement, referenceElement, badgeStyles) {
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

Careplane.prototype.fetch = function(url, callback, options) {
  var params = {
    url: url,
    success: callback
  };

  if(options)
    $.extend(params, options);

  $.ajax(params);
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
