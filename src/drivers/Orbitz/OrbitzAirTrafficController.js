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

OrbitzAirTrafficController.prototype.poll = function() {
  this.discoverTrips();
  this.scoreTrips();
};

OrbitzAirTrafficController.prototype.origin = function() {
  return $('#airchgOrigin', this.doc)[0].value;
};
OrbitzAirTrafficController.prototype.destination = function() {
  return $('#airchgDestination', this.doc)[0].value;
};

OrbitzAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('result');
};

OrbitzAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    $('.bookIt a', trip.tripElement).click(controller.events.purchase(controller, trip));
  });
};
