require('./helper');

vows.describe('HipmunkFlight').addBatch({
  var HipmunkFlight = require('drivers/hipmunk/hipmunk-flight');

  '.parse': {
    'standard flight': {
      var flight;
      beforeEach(function() {
        loadFixtures('hipmunk_dtw_sfo_trip.html');
        flight = HipmunkFlight.parse($('.details-padding').get(0));
      });
      'parses airline': function() {
        expect(flight.airline).toBe('American Airlines #4362 ')
      });
      'parses origin': function() {
        expect(flight.origin).toBe('DTW')
      });
      'parses destination': function() {
        expect(flight.destination).toBe('ORD')
      });
    });

    'special cases': {
      'ignores Mystery airlines/aircraft': function() {
        loadFixtures('hipmunk_lhr_atl_trip.html');
        var flight = HipmunkFlight.parse($('.details-padding').get(0));
        expect(flight.airline).toBeNull();
        expect(flight.aircraft).toBe('');
        expect(flight.origin).toBe('LHR');
        expect(flight.destination).toBe('ATL');
      });
    });
  });
});
