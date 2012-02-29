var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var HipmunkRailTrip = helper.plugin.require('./drivers/hipmunk/hipmunk-rail-trip');

vows.describe('HipmunkRailTrip').addBatch({
  '.parse': {
    topic: function() {
      var $ = loadFixtures('hipmunk_lan_chi_rail_trip.html');
      rail = HipmunkRailTrip.parse($('.details-padding').get(1));
    },
    'parses origin': function() {
      assert.equal(rail.origin, 'BTL');
    },
    'parses destination': function() {
      assert.equal(rail.destination, 'CHI');
    },
    'parses duration': function() {
      assert.equal(rail.duration, 11400);
    }
  }
}).export(module);
