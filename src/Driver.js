Driver = function() {};

Driver.shouldMonitor = function(doc) {
  var match = doc.location.href.search(driver.monitorURL);

  if(driver.monitorExcludeURL) {
    var staticMatch = doc.location.href.search(driver.monitorExcludeURL);
    return match >=0 && staticMatch < 0;
  } else {
    return match >=0
  }
};

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

