var TripFootprintView = require('../trip-footprint-view');

var KayakTripFootprintView = function($, tripElement) {
  this.$ = $;
  this.tripElement = tripElement;
};
KayakTripFootprintView.prototype = new TripFootprintView();

KayakTripFootprintView.prototype.driverName = function() {
  return 'Kayak';
};

KayakTripFootprintView.prototype.footprintParent = function() {
  return this.$(this.tripElement.getElementsByClassName('fpricecol')[0]);
};

module.exports = KayakTripFootprintView;
