TripController = function(trip) {
  this.trip = trip;
};

TripController.events = {
  tripFootprintHoverIn: function(trip) {
    return function(ev) {
      trip.infoView().show();
    };
  },
  tripFootprintHoverOut: function(trip) {
    return function(ev) {
      trip.infoView().hide();
    }
  }
};

TripController.prototype.init = function() {
  this.trip.initViews();

  var target = this.trip.footprintView().target();
  target.addEventListener('mouseover', TripController.events.tripFootprintHoverIn(this.trip), false);
  target.addEventListener('mouseout', TripController.events.tripFootprintHoverOut(this.trip), false);
};
