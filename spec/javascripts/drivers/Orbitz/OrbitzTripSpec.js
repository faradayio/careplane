describe('OrbitzTrip', function() {
  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo_result.html');
    this.trip = new OrbitzTrip($('.result').get(0));
  });

  itBehavesLikeA('Trip');
});
