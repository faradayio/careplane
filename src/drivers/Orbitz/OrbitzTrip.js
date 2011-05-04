OrbitzTrip = function(tripElement) {
  this.tripElement = tripElement;
  this.id = ++OrbitzTrip.count;
};
OrbitzTrip.prototype = new Trip();

OrbitzTrip.count = 0;

OrbitzTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt($('.totalPrice', this.tripElement).text().replace(/[^0-9]/g,''));

  return this._cost;
};

OrbitzTrip.prototype.footprintView = function() {
  if(!this._footprintView) {
    this._footprintView = new OrbitzTripFootprintView(this.tripElement);
  }
  return this._footprintView;
};

OrbitzTrip.prototype.infoView = function() {
  if(!this._infoView) {
    this._infoView = new OrbitzTripInfoView(this.tripElement);
  }
  return this._infoView;
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
