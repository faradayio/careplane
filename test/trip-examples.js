var test = require('./helper'),
    vows = test.vows,
    assert = test.assert,
    sinon = test.sinon;

var fakeweb = require('fakeweb'),
    http = require('http');

var Trip = test.plugin.require('./trip');
var onFlightEmissionsComplete = sinon.spy('onFlightEmissionsComplete');
var onTripEmissionsComplete = sinon.spy('onTripEmissionsComplete');

http.register_intercept({
  uri: '/flights.json',
  host: 'impact.brighterplanet.com',
  body: JSON.stringify({ decisions: { carbon: { object: { value: 123.0 }}}})
});

exports.trip = function(fixtureFile, tripFactory) {
  var trip = tripFactory(test.jqueryFixture(fixtureFile));
  trip.init();

  return {
    'provides #id': function() {
      assert.isNotNull(trip.id);
    },
    'provides #tripElement': function() {
      assert.isNotNull(trip.tripElement);
    },
    'provides #totalFootprint': function() {
      assert.isDefined(trip.totalFootprint);
    },
    'provides #completedFlightCount': function() {
      assert.isDefined(trip.completedFlightCount);
    },
    'provides #isScorable': function() {
      assert.isDefined(trip.isScorable);
    },
    'provides #id': function() {
      assert.isDefined(trip.id);
    },
    'provides #cost': function() {
      assert.match(trip.cost().toString(), /^\d+$/);
    },

    '#score': {
      'parses each flight and runs the onFlightEmissionsComplete callback': function() {
        trip.loadFlights(Trip.events.flightsLoaded);
        trip.score(onFlightEmissionsComplete, onTripEmissionsComplete);
        sinon.assert.called(onFlightEmissionsComplete);
      },
      'sets #isScorable to false': function() {
        trip.loadFlights(Trip.events.flightsLoaded);
        trip.isScorable = true;
        trip.score(onFlightEmissionsComplete, onTripEmissionsComplete);
        assert.isFalse(trip.isScorable);
      }
    },

    '#loadFlights': {
      'gathers a list of flights': function() {
        trip.loadFlights(Trip.events.flightsLoaded);
        assert(trip.flights.length > 0, 'should have at least one flight');
        trip.eachFlight(function(flight) {
          assert.isNotNull(flight.origin, 'should set origin');
        });
      },
      'sets #isScorable to true when complete': function() {
        trip.loadFlights(Trip.events.flightsLoaded);
        assert.isTrue(trip.isScorable);
      }
    }
  };
};
