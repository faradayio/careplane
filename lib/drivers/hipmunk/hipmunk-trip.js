var Trip = require('../../trip'),
    HipmunkLeg = require('./hipmunk-leg'),
    HipmunkTripController = require('./hipmunk-trip-controller'),
    HipmunkTripFootprintView = require('../../views/hipmunk/hipmunk-trip-footprint-view'),
    HipmunkTripInfoView = require('../../views/hipmunk/hipmunk-trip-info-view');

var HipmunkTrip = function(id, $, tripElement, searchData) {
  this.id = id;
  this.$ = $;
  this.tripElement = tripElement;
  this.searchData = searchData;
  this.controller = new HipmunkTripController(this.$, this);
  this.footprintView = new HipmunkTripFootprintView(this.$, this.tripElement);
  this.infoView = new HipmunkTripInfoView(this.$, this.tripElement);
};
HipmunkTrip.prototype = new Trip();

HipmunkTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt(this.$('.price', this.tripElement).text().match(/\d+/)[0]);

  return this._cost;
};

HipmunkTrip.prototype.isValid = function() {
  return this.footprintView.isValid();
};

HipmunkTrip.prototype.footprintParent = function() {
  return this.$('.graph', this.tripElement).get(0);
};

HipmunkTrip.prototype.loadFlights = function(success) {
  this.flights = HipmunkLeg.parse(this.searchData, this.id);
  success(this);
};

module.exports = HipmunkTrip;
