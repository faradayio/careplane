var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var HipmunkFlight = helper.plugin.require('./drivers/hipmunk/hipmunk-flight');

vows.describe('HipmunkFlight').addBatch({
  '.parse': {
    'standard flight': {
      topic: function() {
        loadFixtures('hipmunk_dtw_sfo_trip.html');
        flight = HipmunkFlight.parse($('.details-padding').get(0));
      },
      'parses airline': function() {
        assert.equal(flight.airline, 'American Airlines #4362 ')
      },
      'parses origin': function() {
        assert.equal(flight.origin, 'DTW')
      },
      'parses destination': function() {
        assert.equal(flight.destination, 'ORD')
      }
    },

    'special cases': {
      'ignores Mystery airlines/aircraft': function() {
        var $ = qweryFixtures('hipmunk_lhr_atl_trip.html');
        var flight = HipmunkFlight.parse($('.details-padding').get(0));
        assert.isNull(flight.airline);
        assert.equal(flight.aircraft, '');
        assert.equal(flight.origin, 'LHR');
        assert.equal(flight.destination, 'ATL');
      }
    }
  }
}).export(module);
