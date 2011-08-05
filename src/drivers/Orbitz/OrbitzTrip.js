var $ = require('jquery-browserify');
var Trip = require('../../Trip');
var TripController = require('../../controllers/TripController');
var OrbitzTripFootprintView = require('../../views/Orbitz/OrbitzTripFootprintView');
var OrbitzTripInfoView = require('../../views/Orbitz/OrbitzTripInfoView');
var OrbitzFlight = require('./OrbitzFlight');

var OrbitzTrip = function(extension, id, tripElement) {
  this.extension = extension;
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
    this.flights.push(OrbitzFlight.parse(this.extension, legs[i]));
  }
  success(this);
};

module.exports = OrbitzTrip;
