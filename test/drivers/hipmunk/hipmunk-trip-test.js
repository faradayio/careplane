require('./helper');

require('../../trip-examples');

vows.describe('HipmunkTrip').addBatch({
  var HipmunkTrip = require('drivers/hipmunk/hipmunk-trip');

  var routingId = 'routing-8443f61b2d-imbcblcqd4o-DTW_SFOJun21_Jun22_0_wide';

  'with DTW-SFO trip': {
    beforeEach(function() {
      loadFixtures('hipmunk_dtw_sfo_trip.html');
      this.trip = new HipmunkTrip(routingId, $('.routing').get(0));
    });

    itBehavesLikeA('Trip');

    '#infoPanelElementId': {
      'converts a routing element id into an info-panel id': function() {
        expect(this.trip.infoPanelElementId()).
          toBe('info-panel-8443f61b2d-imbcblcqd4o-DTW_SFOJun21_Jun22');
      });
    });

    'has an #infoPanelElement property': function() {
      expect(this.trip.infoPanelElement.id).toMatch(/info-panel/);
    });
  });

  '#loadFlights': {
    var success;
    beforeEach(function() {
      success = jasmine.createSpy('loadFlightsSuccess');
    });

    'loads the appropriate flight information': function() {
      loadFixtures('hipmunk_dtw_sfo_trip.html');
      var trip = new HipmunkTrip(routingId, $('.routing').get(0));
      trip.loadFlights(success);

      expect(trip.flights[0].origin).toBe('DTW');
      expect(trip.flights[0].destination).toBe('ORD');
      expect(trip.flights[1].origin).toBe('ORD');
      expect(trip.flights[1].destination).toBe('SFO');
    });
    'gracefully handles trips with missing info-panels': function() {
      loadFixtures('hipmunk_dtw_sfo_missing_info_panel.html');
      var trip = new HipmunkTrip(routingId, $('.routing').get(0));
      trip.loadFlights(success);

      expect(trip.flights.length).toBe(0);
    });
    'correctly loads wifi-enabled flights': function() {
      loadFixtures('hipmunk_wifi_trip.html');
      var trip = new HipmunkTrip(routingId, $('.routing').get(0));
      trip.loadFlights(success);

      expect(trip.flights[0].origin).toBe('DTW');
    });
  });
});
