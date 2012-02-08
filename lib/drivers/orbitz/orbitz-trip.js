var $ = require('jquery');

var Trip = require('../../trip'),
    TripController = require('../../controllers/trip-controller'),
    OrbitzTripFootprintView = require('../../views/orbitz/orbitz-trip-footprint-view'),
    OrbitzTripInfoView = require('../../views/orbitz/orbitz-trip-info-view'),
    OrbitzFlight = require('./orbitz-flight'),
    Util = require('../../util');

var OrbitzTrip = function(id, tripElement) {
  this.id = id;
  this.tripElement = tripElement;
  this.controller = new TripController(this);
  this.footprintView = new OrbitzTripFootprintView(this.tripElement);
  this.infoView = new OrbitzTripInfoView(this.tripElement);
};
OrbitzTrip.prototype = new Trip();

OrbitzTrip.events = {
  tripDetailsSuccess: function(trip, success) {
    return function(response) {
      var details = $(response);

      var legs = $('.leg', details);
      legs.each(function(i, leg) {
        trip.flights.push(OrbitzFlight.parse(leg));
      });
      success(trip);
    };
  }
};

OrbitzTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt($('.price', this.tripElement).text().replace(/[^0-9]/g,''));

  return this._cost;
};

OrbitzTrip.prototype.detailUrl = function() {
  return $('.link', this.tripElement).not('.hideLink').attr('href');
};

OrbitzTrip.prototype.loadFlights = function(success) {
  this.flights = [];
  Util.fetch(this.detailUrl(), 
    OrbitzTrip.events.tripDetailsSuccess(this, success));
};

module.exports = OrbitzTrip;
