describe('Trip', function() {
  describe('.average', function() {
    var trip;
    beforeEach(function() {
      trip = new AverageTrip('ORD', 'SEA', 143.5);
      trip.totalFootprint = 143.5;
      Trip._averages = [trip];
    });

    it('looks up an average trip based on origin and destination', function() {
      spyOn(Careplane,'fetch');
      var avg = Trip.average('ORD','PDX', function() { });
      expect(Careplane.fetch).toHaveBeenCalled();
    });
    it('fetches cached averages', function() {
      spyOn(Careplane,'fetch');
      var avg = Trip.average('ORD','SEA', function() { });
      expect(Careplane.fetch).not.toHaveBeenCalled();
    });
    it('provides the average trip to the callback', function() {
      var result;
      var avg = Trip.average('ORD','SEA', function(average) { result = average; });
      expect(result).toEqual(trip);
    });
  });

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
});
