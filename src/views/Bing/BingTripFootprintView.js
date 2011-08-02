BingTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
};
BingTripFootprintView.prototype = new TripFootprintView();

BingTripFootprintView.prototype.driverName = function() {
  return 'Bing';
};

BingTripFootprintView.prototype.footprintParent = function() {
  return $(this.tripElement).parent('tr.row3').prev('tr.row1').find('td.price');
};
