OrbitzAirTrafficController = function(doc) {
  this.doc = doc;
  this.trips = [];
  this.tripElements = this.doc.getElementsByClassName('result');
  this.completedTrips = 0;
};
OrbitzAirTrafficController.prototype = new AirTrafficController();

OrbitzAirTrafficController.prototype.scoreTrips = function() {
  for(var i = 0; i < this.tripElements.length; i++) {
    var tripElement = this.tripElements.item(i);
    var trip = new OrbitzTrip(this.doc, tripElement);
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
