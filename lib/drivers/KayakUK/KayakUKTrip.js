var KayakTrip = require('../../drivers/Kayak/KayakTrip');
var TripController = require('../../controllers/TripController');
var KayakUKTripFootprintView = require('../../views/KayakUK/KayakUKTripFootprintView');
var KayakTripInfoView = require('../../views/Kayak/KayakTripInfoView');

var KayakUKTrip = function(extension, id, tripElement) {
  this.extension = extension;
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
