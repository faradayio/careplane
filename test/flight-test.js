var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var Flight = helper.plugin.require('./flight');

vows.describe('Flight').addBatch({
  '.isAircraftInfo': {
    'returns true if text matches an aircraft manufacturer': function() {
      assert.isTrue(Flight.isAircraftInfo('Boeing 737-800 (Narrow-body Jet)'));
      assert.isTrue(Flight.isAircraftInfo('Embraer 175 (Narrow-body Jet)'));
    },
    'returns false if text does not match any aircraft manufacturer': function() {
      assert.isTrue(Flight.isAircraftInfo('4h 20m'));
      assert.isTrue(Flight.isAircraftInfo('80% on time'));
      assert.isTrue(Flight.isAircraftInfo('1974 miles'));
      assert.isTrue(Flight.isAircraftInfo('WiFi Available'));
    }
  },
  '#sanitizedAircraft': {
    topic: function() { return new Flight(); },

    'removes preceding whitespace': function(flight) {
      flight.aircraft = "                Careplane";
      assert.equal(flight.sanitizedAircraft(), 'Careplane');
    },
    'removes trailing whitespace': function(flight) {
      flight.aircraft = "Careplane 100           ";
      assert.equal(flight.sanitizedAircraft(), 'Careplane 100');
    },
    'removes tabs and newlines': function(flight) {
      flight.aircraft = "Careplane\t\n\n100";
      assert.equal(flight.sanitizedAircraft(), 'Careplane 100');
    }
  }
}).export(module);
