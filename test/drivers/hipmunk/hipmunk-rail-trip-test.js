var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert;

var HipmunkRailTrip = helper.plugin.require('./drivers/hipmunk/hipmunk-rail-trip');

vows.describe('HipmunkRailTrip').addBatch({
  '.parse': {
    topic: function() {
      var $ = helper.qweryFixture('hipmunk_lan_chi_rail_trip.html');
      return HipmunkRailTrip.parse($, $('.details-padding').get(1));
    },
    'parses origin': function(rail) {
      assert.equal(rail.origin, 'BTL');
    },
    'parses destination': function(rail) {
      assert.equal(rail.destination, 'CHI');
    },
    'parses duration': function(rail) {
      assert.equal(rail.duration, 11400);
    }
  }
}).export(module);
