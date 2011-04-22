HipmunkTripController = function(trip) {
  this.trip = trip;
};

HipmunkTripController.events = {
  //tripFootprintHoverIn: function(trip) {
    //return function(ev) {
      //trip.infoView().show();
    //};
  //},
  //tripFootprintHoverOut: function(trip) {
    //return function(ev) {
      //trip.infoView().hide();
    //}
  //}
};

HipmunkTripController.prototype.init = function() {
  this.trip.initViews();
};
