describe('Flight', function() {
  var Flight = require('flight');

  describe('.isAircraftInfo', function() {
    it('returns true if text matches an aircraft manufacturer', function() {
      expect(Flight.isAircraftInfo('Boeing 737-800 (Narrow-body Jet)')).toBeTruthy();
      expect(Flight.isAircraftInfo('Embraer 175 (Narrow-body Jet)')).toBeTruthy();
    });
    it('returns false if text does not match any aircraft manufacturer', function() {
      expect(Flight.isAircraftInfo('4h 20m')).toBeFalsy();
      expect(Flight.isAircraftInfo('80% on time')).toBeFalsy();
      expect(Flight.isAircraftInfo('1974 miles')).toBeFalsy();
      expect(Flight.isAircraftInfo('WiFi Available')).toBeFalsy();
    });
  });
  describe('#sanitizedAircraft', function() {
    var flight;
    beforeEach(function() { flight = new Flight(); });

    it('removes preceding whitespace', function() {
      flight.aircraft = "                Careplane";
      expect(flight.sanitizedAircraft()).toBe('Careplane');
    });
    it('removes trailing whitespace', function() {
      flight.aircraft = "Careplane 100           ";
      expect(flight.sanitizedAircraft()).toBe('Careplane 100');
    });
    it('removes tabs and newlines', function() {
      flight.aircraft = "Careplane\t\n\n100";
      expect(flight.sanitizedAircraft()).toBe('Careplane 100');
    });
  });
});
