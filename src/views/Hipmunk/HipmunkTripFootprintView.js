HipmunkTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
  this.routingElement = this.findRoutingElement();
};
HipmunkTripFootprintView.prototype = new TripFootprintView();

HipmunkTripFootprintView.prototype.isValid = function() {
  return this.routingElement != null;
};

HipmunkTripFootprintView.prototype.loadingText = '<i>Footprinting&hellip;</i>';

HipmunkTripFootprintView.prototype.driverName = function() {
  return 'Hipmunk';
};

HipmunkTripFootprintView.prototype.findRoutingElement = function() {
  var uid = this.tripElement.id.replace('info-panel','routing');
  
  var routingDivs = this.tripElement.ownerDocument.getElementsByClassName('routing');
  for(var i = 0; i < routingDivs.length; i++) {
    var div = routingDivs[i];
    if(div.id.match(new RegExp(uid)))
      return div;
  }
};

HipmunkTripFootprintView.prototype.footprintParent = function() {
  return $('.graph', this.routingElement).get(0);
};

HipmunkTripFootprintView.prototype.tripBarElements = function() {
  return $('.graph .box ', this.routingElement);
};

HipmunkTripFootprintView.prototype.leftmostLeg = function() {
  return $('div.airline:first', this.routingElement);
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
