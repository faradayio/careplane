var KayakTrip = require('../../drivers/kayak/kayak-trip');
var TripController = require('../../controllers/trip-controller');
var KayakUKTripFootprintView = require('../../views/kayak-uk/kayak-uk-trip-footprint-view');
var KayakTripInfoView = require('../../views/kayak/kayak-trip-info-view');

var KayakUKTrip = function(id, tripElement) {
  this.id = id;
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
  this.controller = new TripController(this);
  this.footprintView = new KayakUKTripFootprintView(this.tripElement);
  this.infoView = new KayakTripInfoView(this.tripElement);
};
KayakUKTrip.prototype = new KayakTrip();

KayakUKTrip.events = KayakTrip.events;

KayakUKTrip.prototype.detailUrl = function() {
  return 'http://www.kayak.co.uk/s/run/inlineDetails/flight?searchid=' + this.searchIdentifier() + '&resultid=' + this.resultIdentifier() + '&localidx=' + this.id + '&fs=;';
};

module.exports = KayakUKTrip;
