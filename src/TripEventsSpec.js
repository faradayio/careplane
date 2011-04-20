describe('TripEvents', function() {
  describe('.flightEmissionsComplete', function() {
    var trip, flightEmissionsComplete, onTripEmissionsComplete, callback;
    beforeEach(function() {
      trip = new Trip();
      trip.flights = function() { return []; };
      onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');
      callback = jasmine.createSpy('callback');
      flightEmissionsComplete = TripEvents.
        flightEmissionsComplete(trip, callback, onTripEmissionsComplete);
    });

    it("tallies the flight's footprint", function() {
      spyOn(trip, 'tallyFootprint');
      flightEmissionsComplete({ emission: 1 }, {});
      expect(trip.tallyFootprint).toHaveBeenCalledWith(1);
    });
    it('calls the provided callback function', function() {
      var flight = jasmine.createSpy('Flight');
      var response = { emission: 1 };

      flightEmissionsComplete(response, flight);

      expect(callback).toHaveBeenCalledWith(trip, response, flight);
    });
    it('executes the onTripEmissionsComplete function when all flights are ready', function() {
      trip.isDone = function() { return true; };
      flightEmissionsComplete({ emission: 1 }, {});
      expect(onTripEmissionsComplete).toHaveBeenCalled();
    });
  });
});
