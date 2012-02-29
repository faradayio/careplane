var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var HipmunkBusTrip = helper.plugin.require('./drivers/hipmunk/hipmunk-bus-trip');

vows.describe('HipmunkBusTrip').addBatch({
  '.parse': {
    topic: function() {
      var $ = qweryFixture('hipmunk_lan_chi_rail_trip.html');
      return HipmunkBusTrip.parse($('.details-padding').get(0));
    },
    'parses origin': function(bus) {
      assert.equal(bus.origin, 'LNS');
    },
    'parses destination': function() {
      assert.equal(bus.destination, 'BTL');
    },
    'parses duration': function() {
      assert.equal(bus.duration, 4500);
    }
  }
}).export(module);
