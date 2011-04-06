OrbitzAirTrafficController = function() {
  this.trips = [];
  this.tripElements = Careplane.webDoc.getElementsByClassName('result');
  this.completedTrips = 0;
};
OrbitzAirTrafficController.prototype = new AirTrafficController();

OrbitzAirTrafficController.prototype.scoreTrips = function() {
  for(var i = 0; i < this.tripElements.length; i++) {
    var tripElement = this.tripElements.item(i);
    var trip = new OrbitzTrip(tripElement);
    this.trips.push(trip);
    trip.score(this.onTripEmissionsComplete());
  }
}

OrbitzAirTrafficController.prototype.onTripEmissionsComplete = function() {
  var controller = this;
  return function() {
    //Careplane.log('onTripEmissionsComplete');
    if(++controller.completedTrips == controller.tripElements.length) {
      //Careplane.log('all trips finished');
      controller.rateTrips();
    }
  }
};
