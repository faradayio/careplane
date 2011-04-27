HipmunkTrip = function(tripElement) {
  this.tripElement = tripElement;
  this.id = tripElement.id
};
HipmunkTrip.prototype = new Trip();

HipmunkTrip.prototype.footprintView = function() {
  if(!this._footprintView) {
    this._footprintView = new HipmunkTripFootprintView(this.tripElement);
  }
  return this._footprintView;
};

HipmunkTrip.prototype.infoView = function() {
  if(!this._infoView) {
    this._infoView = new HipmunkTripInfoView(this.tripElement);
  }
  return this._infoView;
};

HipmunkTrip.prototype.controller = function() {
  if(!this._controller) {
    this._controller = new HipmunkTripController(this);
  }
  return this._controller;
};

HipmunkTrip.prototype.flights = function() {
  if(!this._flights || this._flights.length == 0) {
    var legs = $('.leg', this.tripElement);
    legs = $(legs).filter(function(leg) {
      return $('.facts', leg).length > 0;
    });
    this._flights = [];
    var trip = this;
    $(legs).each(function(i, leg) {
      trip._flights.push(HipmunkFlight.parse(leg));
    });
  }
  return this._flights;
}

HipmunkTrip.prototype.initViews = function() {
  this.footprintView().init();
  this.infoView().init();
};
