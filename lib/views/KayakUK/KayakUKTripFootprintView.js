var $ = require('jquery-browserify');
var TripFootprintView = require('../TripFootprintView');

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
