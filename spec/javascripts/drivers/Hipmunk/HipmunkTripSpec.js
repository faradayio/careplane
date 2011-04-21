describe('HipmunkTrip', function() {
  beforeEach(function() {
    loadFixtures('hipmunk_dtw_sfo_trip.html');
    this.trip = new HipmunkTrip($('.info-panel').get(0));
  });

  itBehavesLikeA('Trip');
});
