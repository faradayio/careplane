var AirTrafficControllerEvents = require('../../AirTrafficControllerEvents');

OrbitzAirTrafficControllerEvents = function(extension) {
  this.extension = extension;
};
OrbitzAirTrafficControllerEvents.prototype = new AirTrafficControllerEvents();

OrbitzAirTrafficControllerEvents.prototype.searchEmissionsComplete = function(controller) {
  controller.driver.extension.tracker.search('Orbitz', controller.origin(), controller.destination(), controller.hallOfFame.average());
  controller.sniffPurchases();

  controller.rateTrips();
};

module.exports = OrbitzAirTrafficControllerEvents;
