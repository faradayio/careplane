describe('KayakFlight', function() {
  describe('.parse', function() {
    var flights;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo_flight.html');
      flights = KayakFlight.parse($('.inlineFlightDetailsLeg tr', document));
    });

    it('returns an array of flights', function() {
      expect(flights.length).toBe(4);
    });
    
    it('parses airline, origin, destination, and aircraft', function() {
      expect(flights[0].airline).toBe('AirTran — Flight 143');
      expect(flights[0].origin).toBe('DTW');
      expect(flights[0].destination).toBe('ATL');
      expect(flights[0].aircraft).toBe('Boeing 717');

      expect(flights[1].airline).toBe('AirTran — Flight 321');
      expect(flights[1].origin).toBe('ATL');
      expect(flights[1].destination).toBe('SFO');
      expect(flights[1].aircraft).toBe('Boeing 737-700');

      expect(flights[2].airline).toBe('AirTran — Flight 328');
      expect(flights[2].origin).toBe('SFO');
      expect(flights[2].destination).toBe('ATL');
      expect(flights[2].aircraft).toBe('Boeing 737-700');

      expect(flights[3].airline).toBe('AirTran — Flight 140');
      expect(flights[3].origin).toBe('ATL');
      expect(flights[3].destination).toBe('DTW');
      expect(flights[3].aircraft).toBe('Boeing 717');
    });
  });

  describe('.parseAircraft', function() {
    var extra;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo_flight.html');
      extra = $('.inlineFlightDetailsLeg td.extra div').text();
    });

    it('returns the name of the aircraft', function() {
      var aircraft = KayakFlight.parseAircraft(extra);
      expect(aircraft).toMatch('Boeing 717');
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
