var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var Trip = helper.plugin.require('./trip');

vows.describe('Trip').addBatch({
  '.events': {
    '.flightEmissionsComplete': {
      topic: function() {
        var trip, flightEmissionsComplete, onTripEmissionsComplete, callback;
        trip = new Trip();
        trip.flights = [];
        onTripEmissionsComplete = sinon.spy('onTripEmissionsComplete');
        callback = sinon.spy('callback');
        flightEmissionsComplete = Trip.events.
          flightEmissionsComplete(trip, callback, onTripEmissionsComplete);
        return trip;
      },

      "tallies the flight's footprint": function(trip) {
        spyOn(trip, 'tallyFootprint');
        flightEmissionsComplete(null, { carbon: 1 });
        expect(trip.tallyFootprint).toHaveBeenCalledWith(1);
      },
      'calls the provided callback function': function(trip) {
        var flight = jasmine.createSpy('Flight');
        var response = { carbon: 1, subject: flight };

        flightEmissionsComplete(null, response);

        expect(callback).toHaveBeenCalledWith(trip, response);
      },
      'executes the onTripEmissionsComplete function when all flights are ready': function(trip) {
        trip.isDone = function() { return true; };
        flightEmissionsComplete(null, { carbon: 1 });
        expect(onTripEmissionsComplete).toHaveBeenCalled();
      }
    }
  },

  '#score': {
    'sets isScorable to false': function() {
      var trip = new Trip();
      trip.flights = [];
      trip.score(function() {}, function() {});
      assert.isFalse(trip.isScorable);
    }
  },
  '#rate': {
    'sets the rating': function() {
      var trip = new Trip();
      trip.rate(0.8);
      assert.equal(trip.rating, 0.8);
    }
  }
}).export(module);
