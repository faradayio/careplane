require('./helper');

require('../helpers/spec-helper');

vows.describe('TripController').addBatch({
  var KayakTrip = require('drivers/kayak/kayak-trip');
  var TripController = require('controllers/trip-controller');

  var trip;
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo_flight.html');
    trip = new KayakTrip('0', $('.flightresult').get(0));
    trip.init();
    trip.initViews();
    spyOn(trip.infoView, 'show');
    spyOn(trip.infoView, 'hide');
  });

  'trip-footprint-view#mouseover': {
    'shows the TripInfoView': function() {
      var mouseover = TripController.events.tripFootprintHoverIn(trip);
      mouseover();
      expect(trip.infoView.show).toHaveBeenCalled();
    });
  });
  'trip-footprint-view#mouseout': {
    'hides the TripInfoView': function() {
      var mouseout = TripController.events.tripFootprintHoverOut(trip);
      mouseout();
      expect(trip.infoView.hide).toHaveBeenCalled();
    });
  });

  '#init': {
    'does not explode': function() {
      var controller = new TripController(trip);
      expect(function() {
        controller.init();
      }).not.toThrow();
    });
  });
});
