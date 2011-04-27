HipmunkTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
};
HipmunkTripFootprintView.prototype = new TripFootprintView();

HipmunkTripFootprintView.prototype.isValid = function() {
  return this.tripElement != null;
};

HipmunkTripFootprintView.prototype.loadingText = '<i>Footprinting&hellip;</i>';

HipmunkTripFootprintView.prototype.driverName = function() {
  return 'Hipmunk';
};

HipmunkTripFootprintView.prototype.footprintParent = function() {
  return $('.graph', this.tripElement).get(0);
};

HipmunkTripFootprintView.prototype.tripBarElements = function() {
  return $('.graph .box ', this.tripElement);
};

HipmunkTripFootprintView.prototype.leftmostLeg = function() {
  return $('div.airline:first', this.tripElement);
};

HipmunkTripFootprintView.prototype.hasRoomOnLeft = function() {
  var margin = parseInt(this.leftmostLeg().css('margin-left'));
  return margin >= 200;
};

HipmunkTripFootprintView.prototype.position = function() {
  var footprint = $(this.footprintParagraph());
  if(this.hasRoomOnLeft()) {
    var fpOffset = parseInt(footprint.css('width')) + 10;
    footprint.css('position', 'absolute');
    var bar = this.leftmostLeg();
    footprint.css('left', (parseInt(bar.css('margin-left')) - fpOffset).toString() + 'px');
  }
};
