var $ = require('jquery');
var TripFootprintView = require('../trip-footprint-view');

var KayakUKTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
};
KayakUKTripFootprintView.prototype = new TripFootprintView();

KayakUKTripFootprintView.prototype.driverName = function() {
  return 'KayakUK';
};

KayakUKTripFootprintView.prototype.footprintParent = function() {
  return $(this.tripElement.getElementsByClassName('fpricecol')[0]);
};

module.exports = KayakUKTripFootprintView;
