KayakTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
};
KayakTripFootprintView.prototype = new TripFootprintView();

KayakTripFootprintView.prototype.driverName = function() {
  return 'Kayak';
};

KayakTripFootprintView.prototype.footprintParent = function() {
  return $(this.tripElement.getElementsByClassName('resultbottom')[0]);
};
