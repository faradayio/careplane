TripController = function(trip) {
  this.trip = trip;
};

TripController.events = {
  tripFootprintHoverIn: function(controller) {
    this.trip.infoView().show();
  },
  tripFootprintHoverOut: function(controller) {
    this.trip.infoView().hide();
  }
};

TripController.prototype.init = function() {
  this.trip.footprintView().init();
  this.trip.infoView().init();

  var target = this.trip.footprintView().target();
  target.addEventListener('mouseover', TripController.events.tripFootprintHoverIn)
  target.addEventListener('mouseout', TripController.events.tripFootprintHoverOut)
};
