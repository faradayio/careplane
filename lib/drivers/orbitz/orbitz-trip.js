var $ = require('jquery');
var Trip = require('../../trip');
var TripController = require('../../controllers/trip-controller');
var OrbitzTripFootprintView = require('../../views/orbitz/orbitz-trip-footprint-view');
var OrbitzTripInfoView = require('../../views/orbitz/orbitz-trip-info-view');
var OrbitzFlight = require('./orbitz-flight');

var OrbitzTrip = function(id, tripElement) {
  this.id = id;
  this.tripElement = tripElement;
  this.controller = new TripController(this);
  this.footprintView = new OrbitzTripFootprintView(this.tripElement);
  this.infoView = new OrbitzTripInfoView(this.tripElement);
};
OrbitzTrip.prototype = new Trip();

OrbitzTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt($('.totalPrice', this.tripElement).text().replace(/[^0-9]/g,''));

  return this._cost;
};

OrbitzTrip.prototype.loadFlights = function(success) {
  this.flights = [];
  var legs = this.tripElement.getElementsByClassName('resultLeg');
  for(var i = 0; i < legs.length; i++) {
    this.flights.push(OrbitzFlight.parse(legs[i]));
  }
  success(this);
};

module.exports = OrbitzTrip;
