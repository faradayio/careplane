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
    expect(this.trip.totalFootprint).not.toBeNull();
  });
  it('provides #completedFlightCount', function() {
    expect(this.trip.completedFlightCount).not.toBeNull();
  });
  it('provides #isScorable', function() {
    expect(this.trip.isScorable).not.toBeNull();
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

  describe('#onFlightEmissionsComplete', function() {
    beforeEach(function() {
      this.trip.footprintView().init();
      onFlightEmissionsComplete = this.trip.onFlightEmissionsComplete(onTripEmissionsComplete);
    });

    it('increments #completedFlightCount', function() {
      onFlightEmissionsComplete({ emission: 1 }, {});
      expect(this.trip.completedFlightCount).toBe(1);
    });
    it('increments #totalFootprint', function() {
      onFlightEmissionsComplete({ emission: 11 }, {});
      expect(this.trip.totalFootprint).toBe(11);
    });
    it('executes the onTripEmissionsComplete function when all flights are ready', function() {
      onFlightEmissionsComplete({ emission: 1 }, {});
      onFlightEmissionsComplete({ emission: 2 }, {});
      onFlightEmissionsComplete({ emission: 3 }, {});
      onFlightEmissionsComplete({ emission: 4 }, {});
      expect(onTripEmissionsComplete).toHaveBeenCalled();
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
