KayakAirTrafficController = function(doc) {
  this.doc = doc;
};
KayakAirTrafficController.prototype = new AirTrafficController();

KayakAirTrafficController.prototype.tripClass = KayakTrip;

KayakAirTrafficController.prototype.routeMatches = function(i) {
  if(!this._routeMatches)
    this._routeMatches = this.url.match(/#flights\/([^\-]+)-([^\/]+)\//);

  return this._routeMatches[i];
};

KayakAirTrafficController.prototype.origin = function() {
  return this.routeMatches(1);
};
KayakAirTrafficController.prototype.destination = function() {
  return this.routeMatches(2);
};

KayakAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('flightresult');
};

KayakAirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
  this.rateTrips();
};
