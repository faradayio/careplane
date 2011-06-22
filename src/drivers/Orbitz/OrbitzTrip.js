OrbitzTrip = function(tripElement) {
  this.tripElement = tripElement;
  this.id = ++OrbitzTrip.count;
  this.controller = new TripController(this);
  this.footprintView = new OrbitzTripFootprintView(this.tripElement);
  this.infoView = new OrbitzTripInfoView(this.tripElement);
};
OrbitzTrip.prototype = new Trip();

OrbitzTrip.count = 0;

OrbitzTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt($('.totalPrice', this.tripElement).text().replace(/[^0-9]/g,''));

  return this._cost;
};

OrbitzTrip.prototype.loadFlights = function() {
  this.flights = [];
  var legs = this.tripElement.getElementsByClassName('resultLeg');
  for(var i = 0; i < legs.length; i++) {
    this.flights.push(OrbitzFlight.parse(legs[i]));
  }
};
