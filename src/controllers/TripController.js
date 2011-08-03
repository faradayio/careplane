var $ = require('jquery-browserify');

TripController = function(trip) {
  this.trip = trip;
};

TripController.events = {
  tripFootprintHoverIn: function(trip) {
    return function(ev) {
      trip.infoView.show();
      trip.infoView.positionRelativeTo(trip.footprintView.target());
    };
  },
  tripFootprintHoverOut: function(trip) {
    return function(ev) {
      trip.infoView.hide();
    };
  }
};

TripController.prototype.init = function() {
  this.trip.initViews();
  this.showInfoViewPopupOnFootprintHover();
};

TripController.prototype.showInfoViewPopupOnFootprintHover = function() {
  var target = $(this.trip.footprintView.target());
  target.hover(TripController.events.tripFootprintHoverIn(this.trip),
               TripController.events.tripFootprintHoverOut(this.trip));
};

module.exports = TripController;
