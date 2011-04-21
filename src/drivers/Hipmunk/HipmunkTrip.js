HipmunkTrip = function(tripElement) {
  this.tripElement = tripElement;
};
HipmunkTrip.prototype = new Trip();

HipmunkTrip.prototype.footprintView = function() {
  if(!this._footprintView) {
    this._footprintView = HipmunkTripFootprintView.createFromInfoPanel(this.infoView().tripElement);
  }
  return this._footprintView;
};

HipmunkTrip.prototype.infoView = function() {
  if(!this._infoView) {
    this._infoView = new HipmunkTripInfoView(this.tripElement);
  }
  return this._infoView;
};

HipmunkTrip.prototype.flights = function() {
  if(!this._flights || this._flights.length == 0) {
    var legs = Array.prototype.slice.call(this.tripElement.getElementsByClassName('leg'));
    legs = Array.prototype.filter.call(legs, function(leg) {
      return leg.getElementsByClassName('facts').length > 0;
    });
    this._flights = []
    for(var i in legs) {
      var leg = legs[i];
      this._flights.push(HipmunkFlight.parse(leg));
    }
  }
  return this._flights;
}