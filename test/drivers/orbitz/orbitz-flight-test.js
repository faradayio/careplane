require('./helper');

vows.describe('OrbitzFlight').addBatch({
  var OrbitzFlight = require('drivers/orbitz/orbitz-flight');

  '.parse': {
    'parses an Orbitz leg': function() {
      loadFixtures('orbitz_dtw_sfo_result.html');
      var node = $('.resultLeg').get(0);

      var flight = OrbitzFlight.parse(node);
      expect(flight.origin).toBe('DTW');
      expect(flight.destination).toBe('SFO');
      expect(flight.airline).toBe('Delta Air Lines');
      expect(flight.aircraft).toBe('Boeing 737');
    });
  });
});
