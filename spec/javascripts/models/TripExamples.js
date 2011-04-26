sharedExamplesFor('Trip', function() {
  var onFlightEmissionsComplete, onTripEmissionsComplete;
  beforeEach(function() {
    onFlightEmissionsComplete = jasmine.createSpy('onFlightEmissionsComplete');
    onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');

    TestExtension.urlMap['carbon.brighterplanet.com/flights'] = 123.0;
  });

  it('provides #this.tripElement', function() {
    expect(this.tripElement).not.toBeNull();
  });
  it('provides #totalFootprint', function() {
    expect(this.trip.totalFootprint).toBeDefined();
  });
  it('provides #completedFlightCount', function() {
    expect(this.trip.completedFlightCount).toBeDefined();
  });
  it('provides #isScorable', function() {
    expect(this.trip.isScorable).toBeDefined();
  });
  it('provides #id', function() {
    expect(this.trip.id).toBeDefined();
  });

  describe('#score', function() {
    it('parses each flight and runs the onFlightEmissionsComplete callback', function() {
      this.trip.score(onFlightEmissionsComplete, onTripEmissionsComplete);
      expect(onFlightEmissionsComplete).toHaveBeenCalled();
    });
    it('sets isScorable to false', function() {
      this.trip.score(onFlightEmissionsComplete, onTripEmissionsComplete);
      expect(this.trip.isScorable).toBeFalsy();
    });
  });

  describe('#rate', function() {
    it('sets the rating', function() {
      this.trip.rate(0.8);
      expect(this.trip.rating).toBe(0.8);
    });
  });

  describe('#flights', function() {
    it('returns a list of flights', function() {
      this.trip.score(onFlightEmissionsComplete, onTripEmissionsComplete);
      expect(this.trip.flights().length).toBeGreaterThan(0);
      this.trip.eachFlight(function(flight) {
        expect(flight.origin).not.toBeNull();
      });
    });
  });
});
