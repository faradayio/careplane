describe('Trip', function() {
  describe('.events', function() {
    describe('.flightEmissionsComplete', function() {
      var trip, flightEmissionsComplete, onTripEmissionsComplete, callback;
      beforeEach(function() {
        trip = new Trip();
        trip.flights = [];
        onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');
        callback = jasmine.createSpy('callback');
        flightEmissionsComplete = Trip.events.
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
