var $ = require('jquery-browserify');
var Trip = require('../../Trip'),
    HipmunkLeg = require('./HipmunkLeg'),
    HipmunkTripController = require('./HipmunkTripController'),
    HipmunkTripFootprintView = require('../../views/Hipmunk/HipmunkTripFootprintView'),
    HipmunkTripInfoView = require('../../views/Hipmunk/HipmunkTripInfoView'),
    HipmunkTripEmbeddedInfoView = require('../../views/Hipmunk/HipmunkTripEmbeddedInfoView');

var HipmunkTrip = function(extension, id, tripElement) {
  this.extension = extension;
  this.id = id;
  this.tripElement = tripElement;
  this.infoPanelElement = $('#' + this.infoPanelElementId()).get(0);
  this.controller = new HipmunkTripController(this);
  this.footprintView = new HipmunkTripFootprintView(this.tripElement);
  this.infoView = new HipmunkTripInfoView(this.tripElement);
};
HipmunkTrip.prototype = new Trip();

HipmunkTrip.prototype.infoPanelElementId = function() {
  return this.tripElement.id.
    replace(/routing(.*)_\d+_\w+$/,"info-panel$1");
};

HipmunkTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt($('.price', this.tripElement).text().match(/\d+/)[0]);

  return this._cost;
};

HipmunkTrip.prototype.isValid = function() {
  return this.footprintView.isValid() && this.infoPanelElement;
};

HipmunkTrip.prototype.footprintParent = function() {
  return $('.graph', this.tripElement).get(0);
};

HipmunkTrip.prototype.embeddedInfoView = function() {
  if(!this._embeddedInfoView && this.infoPanelElement) {
    this._embeddedInfoView = new HipmunkTripEmbeddedInfoView(this.infoPanelElement);
  }
  return this._embeddedInfoView;
};

HipmunkTrip.prototype.loadFlights = function(success) {
  var legs = $('.details-padding', this.infoPanelElement);
  this.flights = [];
  var trip = this;
  $(legs).each(function(i, leg) {
    if($('.place', leg).get(0)) {
      trip.flights.push(HipmunkLeg.parse(trip.extension, leg));
    }
  });
  success(this);
};

HipmunkTrip.prototype.initViews = function() {
  this.footprintView.init();
  this.infoView.init();
  if(this.embeddedInfoView())
    this.embeddedInfoView().init();
};

module.exports = HipmunkTrip;
