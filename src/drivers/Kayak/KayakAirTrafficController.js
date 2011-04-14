KayakAirTrafficController = function(doc) {
  this.doc = doc;
  this.trips = [];
  this.completedTrips = 0;
};
KayakAirTrafficController.prototype = new AirTrafficController();

KayakAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('flightresult');
};

KayakAirTrafficController.prototype.poll = function() {
  setInterval(Util.proxy(this.clear, this), 1000);   // every 1 second
};

KayakAirTrafficController.prototype.scoreTrips = function() {
  var tripElements = this.tripElements();
  for(var i = 0; i < tripElements.length; i++) {
    var tripElement = tripElements.item(i);
    var trip = new KayakTrip(tripElement);
    if(trip.isScorable) {
      this.trips.push(trip);
      trip.score(this.onFlightEmissionsComplete);
    }
  }
};
