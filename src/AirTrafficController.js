AirTrafficController = function() {};

AirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
};

AirTrafficController.prototype.discoverTrips = function() {
  var tripElements = this.tripElements();
  for(var i = 0; i < tripElements.length; i++) {
    var tripElement = tripElements.item(i);
    if(!Trip.isAlreadyDiscovered(tripElement)) {
      var trip = this.createTrip(tripElement);
      this.trips.push(trip);
      trip.controller().init();
    }
  }
};

AirTrafficController.prototype.rateTrips = function() {
  var trips = this.finishedTrips();
  for(var i in trips) {
    var trip = trips[i];
    var rating = HallOfFame.ratingFor(trip);
    trip.rate(rating);
    trip.footprintView().updateRating(rating);
    trip.infoView().updateSearchAverage(HallOfFame.average(), trip);
    trip.infoView().updateTripTotal(trip);
    //trip.infoView().updateTripAverage(trip);  this is too difficult right now
  }
};

AirTrafficController.prototype.finishedTrips = function() {
  var list = this.trips.filter(function(trip) {
    return trip.isDone();
  });
  return list;
};



// Events

AirTrafficController.prototype.onFlightEmissionsComplete = function(trip, cm1Response, flight) {
  trip.footprintView().update(trip.totalFootprint);
  trip.infoView().reportFlightMethodology(cm1Response.methodology, flight);
};
