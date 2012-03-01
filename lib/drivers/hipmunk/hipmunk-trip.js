var Trip = require('../../trip'),
    HipmunkLeg = require('./hipmunk-leg'),
    HipmunkTripController = require('./hipmunk-trip-controller'),
    HipmunkTripFootprintView = require('../../views/hipmunk/hipmunk-trip-footprint-view'),
    HipmunkTripInfoView = require('../../views/hipmunk/hipmunk-trip-info-view'),
    HipmunkTripEmbeddedInfoView = require('../../views/hipmunk/hipmunk-trip-embedded-info-view');

var HipmunkTrip = function(id, $, tripElement) {
  this.id = id;
  this.$ = $;
  this.tripElement = tripElement;
  this.infoPanelElement = this.$('#' + this.infoPanelElementId()).get(0);
  this.controller = new HipmunkTripController(this.$, this);
  this.footprintView = new HipmunkTripFootprintView(this.$, this.tripElement);
  this.infoView = new HipmunkTripInfoView(this.$, this.tripElement);
  this.embeddedInfoView = new HipmunkTripEmbeddedInfoView(this.$, this.infoPanelElement);
};
HipmunkTrip.prototype = new Trip();

HipmunkTrip.prototype.infoPanelElementId = function() {
  return this.tripElement.id.
    replace(/routing(.*)_\d+_\w+$/,"info-panel$1");
};

HipmunkTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt(this.$('.price', this.tripElement).text().match(/\d+/)[0]);

  return this._cost;
};

HipmunkTrip.prototype.isValid = function() {
  return this.footprintView.isValid() && this.infoPanelElement;
};

HipmunkTrip.prototype.footprintParent = function() {
  return this.$('.graph', this.tripElement).get(0);
};

HipmunkTrip.prototype.loadFlights = function(success) {
  var legs = this.$('.details-padding', this.infoPanelElement);
  this.flights = [];
  var trip = this;
  this.$(legs).each(function(i, leg) {
    if(trip.$('.place', leg).get(0)) {
      trip.flights.push(HipmunkLeg.parse(trip.$, leg));
    }
  });
  success(this);
};

HipmunkTrip.prototype.initViews = function() {
  Trip.prototype.initViews.apply(this);
  if(this.embeddedInfoView)
    this.embeddedInfoView.init();
};

module.exports = HipmunkTrip;
