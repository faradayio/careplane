OrbitzAirTrafficController = function(doc) {
  this.doc = doc;
};
OrbitzAirTrafficController.prototype = new AirTrafficController();

OrbitzAirTrafficController.prototype.tripClass = OrbitzTrip;
OrbitzAirTrafficController.prototype.events = Util.mergeObjects(OrbitzAirTrafficController.prototype.events, {
  searchEmissionsComplete: function() {
    Careplane.currentExtension.search();
    controller.rateTrips();
  }
});

OrbitzAirTrafficController.prototype.origin = function() {
  return $('#airchgOrigin').value();
};
OrbitzAirTrafficController.prototype.destination = function() {
  return $('#airchgDestination').value();
};

OrbitzAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('result');
};
