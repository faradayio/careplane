var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

vows.describe('Flight').addBatch({
  var Flight = require('flight');

  '.isAircraftInfo': {
    'returns true if text matches an aircraft manufacturer': function() {
      expect(Flight.isAircraftInfo('Boeing 737-800 (Narrow-body Jet)')).toBeTruthy();
      expect(Flight.isAircraftInfo('Embraer 175 (Narrow-body Jet)')).toBeTruthy();
    });
    'returns false if text does not match any aircraft manufacturer': function() {
      expect(Flight.isAircraftInfo('4h 20m')).toBeFalsy();
      expect(Flight.isAircraftInfo('80% on time')).toBeFalsy();
      expect(Flight.isAircraftInfo('1974 miles')).toBeFalsy();
      expect(Flight.isAircraftInfo('WiFi Available')).toBeFalsy();
    });
  });
  '#sanitizedAircraft': {
    var flight;
    beforeEach(function() { flight = new Flight(); });

    'removes preceding whitespace': function() {
      flight.aircraft = "                Careplane";
      expect(flight.sanitizedAircraft()).toBe('Careplane');
    });
    'removes trailing whitespace': function() {
      flight.aircraft = "Careplane 100           ";
      expect(flight.sanitizedAircraft()).toBe('Careplane 100');
    });
    'removes tabs and newlines': function() {
      flight.aircraft = "Careplane\t\n\n100";
      expect(flight.sanitizedAircraft()).toBe('Careplane 100');
    });
  });
});
