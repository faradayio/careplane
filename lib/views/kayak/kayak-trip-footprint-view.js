var $ = require('jquery');
var TripFootprintView = require('../trip-footprint-view');

var KayakTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
};
KayakTripFootprintView.prototype = new TripFootprintView();

KayakTripFootprintView.prototype.driverName = function() {
  return 'Kayak';
};

KayakTripFootprintView.prototype.footprintParent = function() {
  return $(this.tripElement.getElementsByClassName('resultbottom')[0]);
};

module.exports = KayakTripFootprintView;
