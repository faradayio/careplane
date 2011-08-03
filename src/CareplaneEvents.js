var $ = require('jquery-browserify');

CareplaneEvents = {
  driverBecomesAvailable: function(extension, driverClass) {
    return function(driverEnabled) {
      if(driverEnabled) {
        extension.currentDriver = new driverClass(extension);
        extension.currentDriver.load();
      }
    };
  },

  hideEmissionEstimates: function(doc) {
    return function() {
      $('.careplane-footprint', doc).hide();
    };
  }
}

module.exports = CareplaneEvents;
