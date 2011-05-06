Driver = function() {};

Driver.prototype.load = function() {
  var driver = this;
  var loadInterval = setInterval(function() {
    if(driver.isActiveSearch()) {
      driver.extension.notify(driver.klass);
      driver.extension.addStyleSheet();
      driver.insertAttribution();
      driver.atc.poll();
      clearInterval(loadInterval);
    }
  }, 500);
};

