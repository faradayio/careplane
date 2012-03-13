var AirTrafficControllerEvents = require('../../air-traffic-controller-events');

var OrbitzAirTrafficControllerEvents = function() { };
OrbitzAirTrafficControllerEvents.prototype = new AirTrafficControllerEvents();

OrbitzAirTrafficControllerEvents.prototype.searchEmissionsComplete = function(controller) {
  //controller.driver.extension.tracker.search('Orbitz', controller.origin(), controller.destination(), controller.hallOfFame.average());
  //controller.sniffPurchases();

  controller.rateTrips();
};

module.exports = OrbitzAirTrafficControllerEvents;
