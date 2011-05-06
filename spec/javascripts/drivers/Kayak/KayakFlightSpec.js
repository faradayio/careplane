describe('KayakFlight', function() {
  describe('.parseAircraft', function() {
    var segments;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo_flight.html');
      segments = $('.inlineFlightDetailsLeg table:first tr').get();
    });

    it('returns the name of the aircraft', function() {
      var aircraft = KayakFlight.parseAircraft(table);
      expect(aircraft).toMatch('Embraer');
    });
    it('filters out aircraft details', function() {
      $('.inlineFlightDetailsLeg td.extra').html('hi|Embraer (Winglets) (Narrow-body)|man');
      var aircraft = KayakFlight.parseAircraft(table);
      expect(aircraft).not.toMatch(/\(/);
    });
    it('returns null if no aircraft found', function() {
      $('.inlineFlightDetailsLeg td.extra').html('hi|there|man');
      var aircraft = KayakFlight.parseAircraft(table);
      expect(aircraft).toMatch('Embraer');
    });
  });
});
