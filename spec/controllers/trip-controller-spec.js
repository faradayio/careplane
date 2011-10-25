describe('TripController', function() {
  var KayakTrip = require('drivers/kayak/kayak-trip');
  var TripController = require('controllers/trip-controller');

  var trip, footprintView, infoView;
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo_flight.html');
    trip = new KayakTrip('0', $('.flightresult').get(0));
    trip.initViews();
    spyOn(trip.infoView, 'show');
    spyOn(trip.infoView, 'hide');
  });

  describe('trip-footprint-view#mouseover', function() {
    it('shows the TripInfoView', function() {
      var mouseover = TripController.events.tripFootprintHoverIn(trip);
      mouseover();
      expect(trip.infoView.show).toHaveBeenCalled();
    });
  });
  describe('trip-footprint-view#mouseout', function() {
    it('hides the TripInfoView', function() {
      var mouseout = TripController.events.tripFootprintHoverOut(trip);
      mouseout();
      expect(trip.infoView.hide).toHaveBeenCalled();
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
