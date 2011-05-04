OrbitzAirTrafficController = function(doc) {
  this.doc = doc;
  this.url = this.doc.location.href;
  this.tripClass = OrbitzTrip;
  this.driver = Orbitz;
};
OrbitzAirTrafficController.prototype = new AirTrafficController();

OrbitzAirTrafficController.prototype.events.searchEmissionsComplete = function(controller) {
  Careplane.currentExtension.tracker.search(controller.origin(), controller.destination(), HallOfFame.average());
  controller.sniffPurchases();

  controller.rateTrips();
};

OrbitzAirTrafficController.prototype.origin = function() {
  return $('#airchgOrigin').value();
};
OrbitzAirTrafficController.prototype.destination = function() {
  return $('#airchgDestination').value();
};

OrbitzAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('result');
};
