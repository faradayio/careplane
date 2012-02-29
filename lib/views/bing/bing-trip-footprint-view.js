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
  var parentTr = this.$(this.tripElement).parents('tr').prevAll('tr.row1').get(0);
  var parentElement = this.$('td.airline', parentTr);
  return parentElement;
};

module.exports = BingTripFootprintView;
