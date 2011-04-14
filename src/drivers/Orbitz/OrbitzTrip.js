OrbitzTrip = function(tripElement) {
  this.tripElement = tripElement;
  this.totalFootprint = 0;
  this.completedFlightCount = 0;
  this.isScorable = true;
};
OrbitzTrip.prototype = new Trip();

OrbitzTrip.prototype.footprintView = function() {
  if(!this._footprintView) {
    this._footprintView = new OrbitzTripFootprintView(this.tripElement);
  }
  return this._footprintView;
};

OrbitzTrip.prototype.flights = function() {
  if(!this._flights) {
    this._flights = [];
    var legs = this.tripElement.getElementsByClassName('resultLeg');
    for(var i = 0; i < legs.length; i++) {
      this._flights.push(OrbitzFlight.parse(legs[i]));
    }
  }
  return this._flights;
}

OrbitzTrip.prototype.eachFlight = function(callback) {
  for(var i in this.flights()) {
    callback(this.flights()[i]);
  }
};
