describe('HipmunkTrip', function() {
  describe('with DTW-SFO trip', function() {
    beforeEach(function() {
      loadFixtures('hipmunk_dtw_sfo_trip.html');
      this.trip = new HipmunkTrip($('.routing').get(0));
    });

    itBehavesLikeA('Trip');
  });

  it('parses a multi-leg flight', function() {
    loadFixtures('hipmunk_dtw_sfo_multileg_trip.html');
    var trip = new HipmunkTrip($('.routing').get(0));

    expect(trip.flights().length).toBe(2);
  });
  
  it('gracefully handles trips with missing info-panels', function() {
    loadFixtures('hipmunk_dtw_sfo_missing_info_panel.html');
    var trip = new HipmunkTrip($('.routing').get(0));

    expect(trip.flights().length).toBe(0);
  });
});