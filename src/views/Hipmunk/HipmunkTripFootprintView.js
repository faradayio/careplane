HipmunkTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
  this.routingElement = this.findRoutingElement();
};
HipmunkTripFootprintView.prototype = new TripFootprintView();

HipmunkTripFootprintView.prototype.loadingText = '<i>Footprinting&hellip;</i>';

HipmunkTripFootprintView.prototype.driverName = function() {
  return 'Hipmunk';
};

HipmunkTripFootprintView.prototype.findRoutingElement = function(tripElement) {
  var uid = this.tripElement.id.replace('info-panel','routing');
  
  var routingDivs = this.tripElement.ownerDocument.getElementsByClassName('routing');
  for(var i = 0; i < routingDivs.length; i++) {
    var div = routingDivs[i];
    if(div.id.match(new RegExp(uid)))
      return div;
  }
};

HipmunkTripFootprintView.prototype.footprintParent = function() {
  return $(this.routingElement).find('.graph').get(0);
};

HipmunkTripFootprintView.prototype.leftmostLeg = function() {
  return $(this.routingElement).find('div.airline:first');
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
    footprint.css('left', (this.leftmostLeg().offset().left - fpOffset).toString() + 'px');
  }
};
