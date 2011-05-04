KayakAirTrafficController = function(doc) {
  this.doc = doc;
  this.url = this.doc.location.href;
  this.tripClass = KayakTrip;
  this.driver = Kayak;
};
KayakAirTrafficController.prototype = new AirTrafficController();

KayakAirTrafficController.prototype.routeMatches = function() {
  if(!this._routeMatches && this.url)
    this._routeMatches = this.url.match(/#flights\/([^\-]+)-([^\/]+)\//);

  return this._routeMatches;
};

KayakAirTrafficController.prototype.origin = function() {
  return this.routeMatches() ? this.routeMatches()[1] : '';
};
KayakAirTrafficController.prototype.destination = function() {
  return this.routeMatches() ? this.routeMatches()[2] : '';
};

KayakAirTrafficController.prototype.tripElements = function() {
  return this.doc.getElementsByClassName('flightresult');
};

KayakAirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
  this.rateTrips();
};
