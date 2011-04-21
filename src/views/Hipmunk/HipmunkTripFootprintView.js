HipmunkTripFootprintView = function(routingElement) {
  this.routingElement = routingElement;
  this.tripElement = routingElement;
};
HipmunkTripFootprintView.prototype = new TripFootprintView();

HipmunkTripFootprintView.createFromInfoPanel = function(tripElement) {
  var uid = tripElement.id.replace('info-panel','routing');
  
  var routingElement;
  var routingDivs = tripElement.ownerDocument.getElementsByClassName('routing');
  for(var i = 0; i < routingDivs.length; i++) {
    var div = routingDivs[i];
    if(div.id.match(new RegExp(uid))) {
      routingElement = div;
      break;
    }
  }

  return new HipmunkTripFootprintView(routingElement);
};

HipmunkTripFootprintView.prototype.driverName = function() {
  return 'Hipmunk';
};

HipmunkTripFootprintView.prototype.footprintParent = function() {
  return this.routingElement;
};
