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
  for(var i in this.trips) {
    var trip = this.trips[i];
    trip.score(
      this.onFlightEmissionsComplete,
      Util.proxy(this.onTripEmissionsComplete, this));
  }
}

OrbitzAirTrafficController.prototype.createTrip = function(tripElement) {
  return new OrbitzTrip(tripElement);
};


// Events

OrbitzAirTrafficController.prototype.onTripEmissionsComplete = function() {
  if(++this.completedTrips == this.tripElements.length) {
    this.rateTrips();
  }
};
