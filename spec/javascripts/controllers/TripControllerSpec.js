describe('TripController', function() {
  var trip, footprintView, infoView;
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo_direct_flight.html');
    trip = new KayakTrip($('.flightresult').get(0));
    trip.initViews();
    spyOn(trip.infoView(), 'show');
    spyOn(trip.infoView(), 'hide');
  });

  describe('TripFootprintView#mouseover', function() {
    it('shows the TripInfoView', function() {
      var mouseover = TripController.events.tripFootprintHoverIn(trip);
      mouseover();
      expect(trip.infoView().show).toHaveBeenCalled();
    });
  });
  describe('TripFootprintView#mouseout', function() {
    it('hides the TripInfoView', function() {
      var mouseout = TripController.events.tripFootprintHoverOut(trip);
      mouseout();
      expect(trip.infoView().hide).toHaveBeenCalled();
    });
  });

  describe('#init', function() {
    it('does not explode', function() {
      var controller = new TripController(trip);
      expect(function() {
        controller.init();
      }).not.toThrow();
    });
  });
});
