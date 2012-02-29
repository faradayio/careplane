var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var HipmunkTrip = helper.plugin.require('./drivers/hipmunk/hipmunk-trip');

var tripExamples = require('../../trip-examples');

var routingId = 'routing-8443f61b2d-imbcblcqd4o-DTW_SFOJun21_Jun22_0_wide';

vows.describe('HipmunkTrip').addBatch(
  tripExamples('hipmunk_dtw_sfo_trip.html', function($) {
    return new HipmunkTrip(routingId, $('.routing').get(0));
  })
).addBatch({
  'with DTW-SFO trip': {
    topic: function() {
      var $ = qweryFixture('hipmunk_dtw_sfo_trip.html');
      trip = new HipmunkTrip(routingId, $('.routing').get(0));
    },

    '#infoPanelElementId': {
      'converts a routing element id into an info-panel id': function(trip) {
        assert.equal(trip.infoPanelElementId(),
          'info-panel-8443f61b2d-imbcblcqd4o-DTW_SFOJun21_Jun22');
      }
    },

    'has an #infoPanelElement property': function(trip) {
      assert.match(trip.infoPanelElement.id, /info-panel/);
    }
  },

  '#loadFlights': {
    topic: function() {
      return jasmine.createSpy('loadFlightsSuccess');
    },

    'loads the appropriate flight information': function(success) {
      var $ = qweryFixture('hipmunk_dtw_sfo_trip.html');
      var trip = new HipmunkTrip(routingId, $('.routing').get(0));
      trip.loadFlights(success);

      assert.equal(trip.flights[0].origin, 'DTW');
      assert.equal(trip.flights[0].destination, 'ORD');
      assert.equal(trip.flights[1].origin, 'ORD');
      assert.equal(trip.flights[1].destination, 'SFO');
    },
    'gracefully handles trips with missing info-panels': function(success) {
      var $ = qweryFixture('hipmunk_dtw_sfo_missing_info_panel.html');
      var trip = new HipmunkTrip(routingId, $('.routing').get(0));
      trip.loadFlights(success);

      assert.equal(trip.flights.length, 0);
    },
    'correctly loads wifi-enabled flights': function(success) {
      var $ = qweryFixture('hipmunk_wifi_trip.html');
      var trip = new HipmunkTrip(routingId, $('.routing').get(0));
      trip.loadFlights(success);

      assert.equal(trip.flights[0].origin, 'DTW');
    }
  }
}).export(module);
