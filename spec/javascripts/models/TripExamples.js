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
  it('provides #cost', function() {
    expect(this.trip.cost().toString()).toMatch(/^\d+$/);
  });

  describe('#score', function() {
    it('parses each flight and runs the onFlightEmissionsComplete callback', function() {
      this.trip.score(onFlightEmissionsComplete, onTripEmissionsComplete);
      expect(onFlightEmissionsComplete).toHaveBeenCalled();
    });
  });

  describe('#flights', function() {
    it('returns a list of flights', function() {
      expect(this.trip.flights().length).toBeGreaterThan(0);
      this.trip.eachFlight(function(flight) {
        expect(flight.origin).not.toBeNull();
      });
    });
  });
});
