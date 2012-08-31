var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var Trip = helper.plugin.require('./trip');

var trip, flightEmissionsComplete, onTripEmissionsComplete, callback;
trip = new Trip();
trip.flights = [];
onTripEmissionsComplete = sinon.spy();
callback = sinon.spy();
flightEmissionsComplete = Trip.events.
  flightEmissionsComplete(trip, callback, onTripEmissionsComplete);

vows.describe('Trip').addBatch({
  '.events': {
    '.flightEmissionsComplete': {
      "iallies the flight's footprint": function() {
        sinon.spy(trip, 'tallyFootprint');
        flightEmissionsComplete(null, { carbon: 1 });
        sinon.assert.calledWith(trip.tallyFootprint, 1);
      },
      'calls the provided callback function': function() {
        var flight = sinon.spy();
        var response = { carbon: 1, subject: flight };

        flightEmissionsComplete(null, response);

        sinon.assert.calledWith(callback, trip, response);
      },
      'executes the onTripEmissionsComplete function when all flights are ready': function() {
        trip.isDone = function() { return true; };
        flightEmissionsComplete(null, { carbon: 1 });
        sinon.assert.called(onTripEmissionsComplete);
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
