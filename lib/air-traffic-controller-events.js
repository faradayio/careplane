var AirTrafficControllerEvents = function() {};

AirTrafficControllerEvents.prototype.flightEmissionsComplete = function(trip, estimate) {
  trip.footprintView.update(trip.totalFootprint);
  trip.infoView.reportFlightMethodology(estimate.methodology, estimate.subject);
};

AirTrafficControllerEvents.prototype.tripEmissionsComplete = function(controller) {
  return function(trip, estimate) {
    controller.hallOfFame.induct(trip);

    if(++controller.completedTrips == controller.tripCount) {
      controller.events.searchEmissionsComplete(controller);
    }
  };
};

AirTrafficControllerEvents.prototype.searchEmissionsComplete = function(controller) {
  //controller.driver.extension.tracker.search(controller.driver.driverName(), controller.origin(), controller.destination(), controller.hallOfFame.average());
  
  controller.sniffPurchases();
};

AirTrafficControllerEvents.prototype.pollInterval = function(controller) {
  return function() {
    controller.clear();
  };
};

AirTrafficControllerEvents.prototype.purchase = function(controller, trip) {
  return function() {
    controller.driver.extension.tracker.purchase(controller.origin(), controller.destination(),
                                                trip.cost(), controller.minCost(), trip.totalFootprint, controller.hallOfFame.average());
  };
};

module.exports = AirTrafficControllerEvents;
