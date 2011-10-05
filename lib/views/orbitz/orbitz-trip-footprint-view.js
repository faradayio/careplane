var $ = require('jquery');
var TripFootprintView = require('../trip-footprint-view');

var OrbitzTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
};
OrbitzTripFootprintView.prototype = new TripFootprintView();

OrbitzTripFootprintView.prototype.driverName = function() {
  return 'Orbitz';
};

OrbitzTripFootprintView.prototype.footprintParent = function() {
  return $(this.tripElement);
};

module.exports = OrbitzTripFootprintView;
