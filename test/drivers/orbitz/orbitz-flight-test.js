var test = require('../../helper'),
    vows = test.vows,
    assert = test.assert,
    sinon = test.sinon;

var OrbitzFlight = test.plugin.require('./drivers/orbitz/orbitz-flight');

vows.describe('OrbitzFlight').addBatch({
  '.parse': {
    topic: function() {
      test.htmlFixture('orbitz_dtw_sfo_flight_details.html', this.callback);
    },

    'parses an Orbitz leg': function(err, window) {
      var node = window.document.getElementsByClassName('slice')[0];

      var flight = OrbitzFlight.parse(node);
      assert.equal(flight.origin, 'DTW');
      assert.equal(flight.destination, 'SFO');
      assert.equal(flight.airline, 'Delta Air Lines');
      assert.equal(flight.aircraft, 'Boeing 757');
    }
  }
}).export(module);
