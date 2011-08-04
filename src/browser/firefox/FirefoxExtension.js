var $ = require('jquery-browserify');
var jQuery = $;
var Careplane = require('../../Careplane');
var CareplaneEvents = require('../../CareplaneEvents');
var FirefoxTracker = require('./FirefoxTracker');

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
      style.setAttribute('href', url);
      extension.doc.head.appendChild(style);
    };
  },

  loadDriver: function(extension) {
    return function(driver) {
      $(extension.doc).ready(function() {
        var driverClass;
        switch(driver) {
          case 'Hipmunk':
            driverClass = Hipmunk;
            break;
          case 'Kayak':
            driverClass = Kayak;
            break;
          case 'KayakUK':
            driverClass = KayakUK;
            break;
          case 'Orbitz':
            driverClass = Orbitz;
            break;
        }
        if(extension.driverShouldMonitor(driverClass, extension.doc)) {
          var driverInstance = new driverClass(extension);
          driverInstance.load();
        }
      });
    };
  }
};

FirefoxExtension.log = function(str) {
  console.log(str);
};

FirefoxExtension.prototype.fetch = function(url, callback, options) {
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function (e) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        var response = jQuery.parseJSON(req.responseText);
        callback(response);
      }
    }
  };
  req.send(null);
};

FirefoxExtension.prototype.loadDriver = function() {
  self.port.on('driver.load', FirefoxExtension.events.loadDriver(this), false);
  self.port.on('stylesheet.load', FirefoxExtension.events.loadStylesheet(this), false);
  self.port.on('footprints.hide', CareplaneEvents.hideEmissionEstimates(this.doc));
};

FirefoxExtension.load = function() {
  var extension = new FirefoxExtension(window.document);
  extension.loadDriver();
  return extension;
};

module.exports = FirefoxExtension;
