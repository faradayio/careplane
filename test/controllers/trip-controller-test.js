var helper = require('../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;
var KayakTrip = require('../../lib/drivers/kayak/kayak-trip');
var TripController = require('../../lib/controllers/trip-controller');

var tripTopic = function() {
  var trip;
  helper.htmlFixture('kayak_dtw_sfo_flight.html', function($) {
    trip = new KayakTrip('0', $('.flightresult').get(0));
    trip.init();
    trip.initViews();
  });
  return trip;
};

vows.describe('TripController').addBatch({
  '#mouseover': {
    topic: tripTopic,

    'shows the TripInfoView': function(trip) {
      sinon.spy(trip.infoView, 'show');
      var mouseover = TripController.events.tripFootprintHoverIn(trip);
      mouseover();
      sinon.assert.called(trip.infoView.show);
    }
  },
  '#mouseout': {
    topic: tripTopic,

    'hides the TripInfoView': function(trip) {
      sinon.spy(trip.infoView, 'hide');
      var mouseout = TripController.events.tripFootprintHoverOut(trip);
      mouseout();
      sinon.assert.called(trip.infoView.hide);
    }
  },

  '#init': {
    topic: tripTopic,

    'does not explode': function(trip) {
      var controller = new TripController(trip);
      assert.doesNotThrow(function() {
        controller.init();
      });
    }
  }
}).export(module);
