OrbitzAirTrafficController = function(doc) {
  this.doc = doc;
  this.trips = [];
  this.completedTrips = 0;
};
OrbitzAirTrafficController.prototype = new AirTrafficController();

OrbitzAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('result');
};

OrbitzAirTrafficController.prototype.scoreTrips = function() {
  var tripElements = this.tripElements();
  for(var i = 0; i < tripElements.length; i++) {
    var tripElement = tripElements.item(i);
    var trip = new OrbitzTrip(tripElement);
    this.trips.push(trip);
    trip.score(
      this.onFlightEmissionsComplete,
      Util.proxy(this.onTripEmissionsComplete, this));
  }
}



// Events

OrbitzAirTrafficController.prototype.onTripEmissionsComplete = function() {
  if(++this.completedTrips == this.tripElements.length) {
    this.rateTrips();
  }
};
