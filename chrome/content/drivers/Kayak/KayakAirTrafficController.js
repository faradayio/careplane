KayakAirTrafficController = function(doc) {
  this.doc = doc;
  this.trips = [];
};
KayakAirTrafficController.prototype = new AirTrafficController();

KayakAirTrafficController.prototype.poll = function() {
  setInterval(this.clear(), 1000);   // every 1 second
};

KayakAirTrafficController.prototype.scoreTrips = function() {
  var tripElements = this.doc.getElementsByClassName('flightresult');
  for(var i = 0; i < tripElements.length; i++) {
    var tripElement = tripElements.item(i);
    var trip = new KayakTrip(this.doc, tripElement);
    if(trip.isScorable()) {
      this.trips.push(trip);
      trip.score(i);
    }
  }
};
