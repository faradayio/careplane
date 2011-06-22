describe('Trip', function() {
  describe('#score', function() {
    it('sets isScorable to false', function() {
      var trip = new Trip();
      trip.flights = [];
      trip.score(function() {}, function() {});
      expect(trip.isScorable).toBeFalsy();
    });
  });
  describe('#rate', function() {
    it('sets the rating', function() {
      var trip = new Trip();
      trip.rate(0.8);
      expect(trip.rating).toBe(0.8);
    });
  });
});
