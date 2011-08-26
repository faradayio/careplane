describe('HipmunkFlight', function() {
  var HipmunkFlight = require('drivers/Hipmunk/HipmunkFlight');

  describe('.parse', function() {
    describe('standard flight', function() {
      var flight;
      beforeEach(function() {
        loadFixtures('hipmunk_dtw_sfo_trip.html');
        flight = HipmunkFlight.parse({}, $('.details-padding').get(0));
      });
      it('parses airline', function() {
        expect(flight.airline).toBe('American Airlines #4362 ')
      });
      it('parses origin', function() {
        expect(flight.origin).toBe('DTW')
      });
      it('parses destination', function() {
        expect(flight.destination).toBe('ORD')
      });
    });

    describe('special cases', function() {
      it('ignores Mystery airlines/aircraft', function() {
        loadFixtures('hipmunk_lhr_atl_trip.html');
        var flight = HipmunkFlight.parse({}, $('.details-padding').get(0));
        expect(flight.airline).toBeNull();
        expect(flight.aircraft).toBe('');
        expect(flight.origin).toBe('LHR');
        expect(flight.destination).toBe('ATL');
      });
    });
  });
});
