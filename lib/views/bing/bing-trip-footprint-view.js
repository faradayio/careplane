var TripFootprintView = require('../trip-footprint-view');

var BingTripFootprintView = function($, tripElement) {
  this.$ = $;
  this.tripElement = tripElement;
};
BingTripFootprintView.prototype = new TripFootprintView();

BingTripFootprintView.prototype.driverName = function() {
  return 'Bing';
};

BingTripFootprintView.prototype.footprintParent = function() {
  var parentElement = this.$('td.booking', this.tripElement);
  return parentElement;
};

module.exports = BingTripFootprintView;
