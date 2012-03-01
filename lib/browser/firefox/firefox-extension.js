var Careplane = require('../../careplane'),
    CareplaneEvents = require('../../careplane-events'),
    FirefoxTracker = require('./firefox-tracker'),
    Bing = require('../../drivers/bing'),
    Hipmunk = require('../../drivers/hipmunk'),
    Kayak = require('../../drivers/kayak'),
    KayakUK = require('../../drivers/kayak-uk'),
    Orbitz = require('../../drivers/orbitz');

var FirefoxExtension = function(doc) {
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
      extension.$(extension.doc).ready(function() {
        var driverClass;
        switch(driver) {
          case 'Bing':
            driverClass = Bing;
            break;
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

FirefoxExtension.prototype.loadDriver = function() {
  self.port.on('driver.load', FirefoxExtension.events.loadDriver(this), false);
  self.port.on('stylesheet.load', FirefoxExtension.events.loadStylesheet(this), false);
  self.port.on('footprints.hide', CareplaneEvents.hideEmissionEstimates(this.doc));
};

FirefoxExtension.load = function() {
  var extension = new FirefoxExtension(window.document);
  extension.init();
  extension.loadDriver();
  return extension;
};

module.exports = FirefoxExtension;
