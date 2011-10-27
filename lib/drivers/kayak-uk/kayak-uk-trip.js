var KayakTrip = require('../../drivers/kayak/kayak-trip');
var TripController = require('../../controllers/trip-controller');
var KayakUKTripFootprintView = require('../../views/kayak-uk/kayak-uk-trip-footprint-view');
var KayakTripInfoView = require('../../views/kayak/kayak-trip-info-view');

var KayakUKTrip = function(id, tripElement) {
  this.id = id;
  this.tripElement = tripElement;
  this.detailHost = 'www.kayak.co.uk';
};
KayakUKTrip.prototype = new KayakTrip();

KayakUKTrip.events = KayakTrip.events;

module.exports = KayakUKTrip;
