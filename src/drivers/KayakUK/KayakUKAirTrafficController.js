KayakUKAirTrafficController = function(doc) {
  this.doc = doc;
  this.url = doc ? this.doc.location.href : null;
  this.tripClass = KayakUKTrip;
};
KayakUKAirTrafficController.prototype = new KayakAirTrafficController();
KayakUKAirTrafficController.events = new AirTrafficControllerEvents();
