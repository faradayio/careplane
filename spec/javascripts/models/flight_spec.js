describe('Flight', function() {
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
});
