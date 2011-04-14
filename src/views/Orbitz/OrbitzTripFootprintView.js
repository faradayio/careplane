OrbitzTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
  this.style = {
    color: '#AAA',
    backgroundColor: '#FFF',
    margin: '0',
    padding: '7px 15px'
  };
};
OrbitzTripFootprintView.prototype = new TripFootprintView();

OrbitzTripFootprintView.prototype.footprintParent = function() {
  return this.tripElement;
};
