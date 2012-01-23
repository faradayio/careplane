require('./helper');

require('../../helpers/spec-helper');

vows.describe('KayakFlight').addBatch({
  var KayakFlight = require('drivers/kayak/kayak-flight');

  '.parse': {
    var flights;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo_flight.html');
      flights = KayakFlight.parse($('.inlineflightitinerarylegs tr'));
    });

    'returns an array of flights': function() {
      expect(flights.length).toBe(4);
    });
    
    'parses airline, origin, destination, and aircraft': function() {
      expect(flights[0].airline).toMatch(/Continental/);
      expect(flights[0].origin).toBe('DTW');
      expect(flights[0].destination).toBe('ORD');
      expect(flights[0].aircraft).toBe('Canadair Regional Jet');

      expect(flights[1].airline).toMatch(/Continental/);
      expect(flights[1].origin).toBe('ORD');
      expect(flights[1].destination).toBe('SFO');
      expect(flights[1].aircraft).toBe('Boeing 757-200');

      expect(flights[2].airline).toMatch(/Continental/);
      expect(flights[2].origin).toBe('SFO');
      expect(flights[2].destination).toBe('PHX');
      expect(flights[2].aircraft).toBe('Airbus A320-100/200');

      expect(flights[3].airline).toMatch(/United/);
      expect(flights[3].origin).toBe('PHX');
      expect(flights[3].destination).toBe('DTW');
      expect(flights[3].aircraft).toBe('Airbus A319');
    });
  });

  '.parseAircraft': {
    var extra;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo_flight.html');
      extra = $('.inlineflightitinerarylegs td.extra').text();
    });

    'returns the name of the aircraft': function() {
      var aircraft = KayakFlight.parseAircraft(extra);
      expect(aircraft).toMatch('Canadair');
    });
    'filters out aircraft details': function() {
      var aircraft = KayakFlight.parseAircraft('hi|Embraer (Winglets) (Narrow-body)|man');
      expect(aircraft).not.toMatch(/\(/);
    });
    'returns null if no aircraft found': function() {
      var aircraft = KayakFlight.parseAircraft('hi|there|man');
      expect(aircraft).toBeNull();
    });
  });
});
