var $ = require('jquery');

var CareplaneEvents = {
  driverBecomesAvailable: function(extension, driverClass) {
    return function(driverEnabled) {
      if(driverEnabled) {
        extension.currentDriver = new driverClass(extension);
        extension.currentDriver.load();
      }
    };
  },

  hideEmissionEstimates: function($) {
    return function() {
      $('.careplane-footprint').hide();
    };
  }
}

module.exports = CareplaneEvents;
