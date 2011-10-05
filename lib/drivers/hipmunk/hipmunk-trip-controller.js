var $ = require('jquery');
var TripController = require('../../controllers/trip-controller');

var HipmunkTripController = function(trip) {
  this.trip = trip;
};
HipmunkTripController.prototype = new TripController();

HipmunkTripController.events = {
  tripFootprintShow: function(trip) {
    return function() {
      trip.footprintView.show();
    };
  },
  tripFootprintHide: function(trip) {
    return function() {
      trip.footprintView.hide();
    };
  }
};

HipmunkTripController.prototype.init = function() {
  this.trip.initViews();
  this.hideFootprintOnTripHover();
  this.showInfoViewPopupOnFootprintHover();
};

HipmunkTripController.prototype.hideFootprintOnTripHover = function() {
  var trip = this.trip;
  var target = trip.footprintView.target();
  var tripBarElements = trip.footprintView.tripBarElements();
  tripBarElements.each(function(i, bar) {
    $(bar).hover(HipmunkTripController.events.tripFootprintHide(trip),
                 HipmunkTripController.events.tripFootprintShow(trip));
  });
};

module.exports = HipmunkTripController;
