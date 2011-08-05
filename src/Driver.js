var $ = require('jquery-browserify');

var Driver = function() {};

Driver.prototype.events = {
  loadPoller: function(driver) {
    return function() {
      if(driver.isActiveSearch()) {
        driver.prepare();
        driver.atc.poll();
        clearInterval(driver.loadInterval);
      }
    };
  }
};

Driver.prototype.driverName = function() {
  return this.klass.driverName;
};

Driver.prototype.isPollingEnabled = function() {
  return this.extension.isPollingEnabled;
};

Driver.prototype.isActiveSearch = function() {
  return $(this.waitForElement, this.doc).get(0) != null;
};

Driver.prototype.prepare = function() {
  if(this.extension.notify)
    this.extension.notify(this);
  if(this.extension.addStyleSheet)
    this.extension.addStyleSheet();
  if(this.insertAttribution)
    this.insertAttribution();
};

Driver.prototype.load = function() {
  if(this.isPollingEnabled()) {
    this.loadInterval = setInterval(this.events.loadPoller(this), 500);
  } else {
    this.prepare();
    this.atc.clear();
  }
};

module.exports = Driver;
