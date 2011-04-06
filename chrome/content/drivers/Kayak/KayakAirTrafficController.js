KayakAirTrafficController = function() {
  this.trips = [];
};
KayakAirTrafficController.prototype = new AirTrafficController();

KayakAirTrafficController.prototype.poll = function() {
  setInterval(this.clear(), 1000);   // every 1 second
};

KayakAirTrafficController.prototype.scoreTrips = function() {
  var tripElements = Careplane.webDoc.getElementsByClassName('flightresult');
  for(var i = 0; i < tripElements.length; i++) {
    var tripElement = tripElements.item(i);
    var trip = new KayakTrip(tripElement);
    if(trip.isScorable()) {
      this.trips.push(trip);
      trip.score(i);
    }
  }
};
