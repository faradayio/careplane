require('../../helpers/spec-helper');

describe('KayakFlight', function() {
  var KayakFlight = require('drivers/kayak/kayak-flight');

  describe('.parse', function() {
    var flights;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo_flight.html');
      flights = KayakFlight.parse($('.inlineflightitinerarylegs tr'));
    });

    it('returns an array of flights', function() {
      expect(flights.length).toBe(3);
    });
    
    it('parses airline, origin, destination, and aircraft', function() {
      expect(flights[0].airline).toMatch(/Delta/);
      expect(flights[0].origin).toBe('DTW');
      expect(flights[0].destination).toBe('LAX');
      expect(flights[0].aircraft).toBe('Boeing 767-300');

      expect(flights[1].airline).toMatch(/Delta/);
      expect(flights[1].origin).toBe('LAX');
      expect(flights[1].destination).toBe('SFO');
      expect(flights[1].aircraft).toBe('Canadair Regional Jet 900');

      expect(flights[2].airline).toMatch(/Delta/);
      expect(flights[2].origin).toBe('SFO');
      expect(flights[2].destination).toBe('DTW');
      expect(flights[2].aircraft).toBe('Boeing 737-800');
    });
  });

  describe('.parseAircraft', function() {
    var extra;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo_flight.html');
      extra = $('.inlineflightitinerarylegs td.extra').text();
    });

    it('returns the name of the aircraft', function() {
      var aircraft = KayakFlight.parseAircraft(extra);
      expect(aircraft).toMatch('Boeing 767-300');
    });
    it('filters out aircraft details', function() {
      var aircraft = KayakFlight.parseAircraft('hi|Embraer (Winglets) (Narrow-body)|man');
      expect(aircraft).not.toMatch(/\(/);
    });
    it('returns null if no aircraft found', function() {
      var aircraft = KayakFlight.parseAircraft('hi|there|man');
      expect(aircraft).toBeNull();
    });
  });
});
