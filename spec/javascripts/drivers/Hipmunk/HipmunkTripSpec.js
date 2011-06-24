describe('HipmunkTrip', function() {
  describe('with DTW-SFO trip', function() {
    beforeEach(function() {
      loadFixtures('hipmunk_dtw_sfo_trip.html');
      this.trip = new HipmunkTrip($('.routing').get(0));
    });

    itBehavesLikeA('Trip');
  });
  
  describe('#loadFlights', function() {
    it('gracefully handles trips with missing info-panels', function() {
      var success = jasmine.createSpy('loadFlightsSuccess');
      loadFixtures('hipmunk_dtw_sfo_missing_info_panel.html');
      var trip = new HipmunkTrip($('.routing').get(0));
      trip.loadFlights(success);

      expect(trip.flights.length).toBe(0);
    });
  });

  describe('#infoPanelElementId', function() {
    it('converts a routing element id into an info-panel id', function() {
      loadFixtures('hipmunk_dtw_sfo_trip.html');
      var trip = new HipmunkTrip($('.routing').get(0));
      expect(trip.infoPanelElementId()).toBe('info-panel-8443f61b2d-imbcblcqd4o-DTW_SFOJun21_Jun22');
    });
  });
});
