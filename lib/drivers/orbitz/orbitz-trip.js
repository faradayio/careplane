var Trip = require('../../trip'),
    TripController = require('../../controllers/trip-controller'),
    OrbitzTripFootprintView = require('../../views/orbitz/orbitz-trip-footprint-view'),
    OrbitzTripInfoView = require('../../views/orbitz/orbitz-trip-info-view'),
    OrbitzFlight = require('./orbitz-flight'),
    Util = require('../../util');

var OrbitzTrip = function(id, $, tripElement) {
  this.$ = $;
  this.id = id;
  this.tripElement = tripElement;
  this.controller = new TripController(this.$, this);
  this.footprintView = new OrbitzTripFootprintView(this.$, this.tripElement);
  this.infoView = new OrbitzTripInfoView(this.$, this.tripElement);
};
OrbitzTrip.prototype = new Trip();

OrbitzTrip.events = {
  tripDetailsSuccess: function(trip, success) {
    return function(response) {
      var details = trip.$(response);
      trip.loadFlightsFromDetails(details, success);
    };
  }
};

OrbitzTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt(this.$('.price', this.tripElement).text().replace(/[^0-9]/g,''));

  return this._cost;
};

OrbitzTrip.prototype.detailUrl = function() {
  return this.$('.link', this.tripElement).not('.hideLink').attr('href');
};

OrbitzTrip.prototype.loadFlights = function(success) {
  this.flights = [];
  Util.fetch(this.detailUrl(), 
    OrbitzTrip.events.tripDetailsSuccess(this, success));
};

OrbitzTrip.prototype.loadFlightsFromDetails = function(details, success) {
  var legs = this.$('.leg', details);
  var trip = this;
  legs.each(function(i, leg) {
    trip.flights.push(OrbitzFlight.parse(trip.$, leg));
  });
  success(this);
};

module.exports = OrbitzTrip;
