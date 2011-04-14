KayakTripFootprintView = function(tripElement) {
  this.tripElement = tripElement;
  this.style = {
    color: '#aaa',
    position: 'absolute',
    left: '10px',
    width: '130px',
    bottom: '20px'
  };
};
KayakTripFootprintView.prototype = new TripFootprintView();

KayakTripFootprintView.prototype.footprintParent = function() {
  return this.tripElement.getElementsByClassName('resultbottom')[0];
};
