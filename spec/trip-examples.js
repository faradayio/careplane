var fakeweb = require('fakeweb'),
    http = require('http');

sharedExamplesFor('Trip', function() {
  var Trip = require('trip');

  var onFlightEmissionsComplete, onTripEmissionsComplete;
  beforeEach(function() {
    onFlightEmissionsComplete = jasmine.createSpy('onFlightEmissionsComplete');
    onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');

    http.register_intercept({
      uri: '/flights.json',
      host: 'impact.brighterplanet.com',
      body: JSON.stringify({ decisions: { carbon: { object: { value: 123.0 }}}})
    });
  });

  afterEach(function() { http.clear_intercepts(); });

  it('provides #id', function() {
    expect(this.trip.id).not.toBeNull();
  });
  it('provides #tripElement', function() {
    expect(this.trip.tripElement).not.toBeNull();
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
      this.trip.loadFlights(Trip.events.flightsLoaded);
      this.trip.score(onFlightEmissionsComplete, onTripEmissionsComplete);
      expect(onFlightEmissionsComplete).toHaveBeenCalled();
    });
    it('sets #isScorable to false', function() {
      this.trip.loadFlights(Trip.events.flightsLoaded);
      this.trip.isScorable = true;
      this.trip.score(onFlightEmissionsComplete, onTripEmissionsComplete);
      expect(this.trip.isScorable).toBeFalsy();
    });
  });

  describe('#loadFlights', function() {
    it('gathers a list of flights', function() {
      this.trip.loadFlights(Trip.events.flightsLoaded);
      expect(this.trip.flights.length).toBeGreaterThan(0);
      this.trip.eachFlight(function(flight) {
        expect(flight.origin).not.toBeNull();
      });
    });
    it('sets #isScorable to true when complete', function() {
      this.trip.loadFlights(Trip.events.flightsLoaded);
      expect(this.trip.isScorable).toBeTruthy();
    });
  });
});
