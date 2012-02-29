var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon,
    plugin = helper.plugin;

var HipmunkLeg = plugin.require('./drivers/hipmunk/hipmunk-leg'),
    HipmunkBusTrip = plugin.require('./drivers/hipmunk/hipmunk-bus-trip'),
    HipmunkFlight = plugin.require('./drivers/hipmunk/hipmunk-flight'),
    HipmunkRailTrip = plugin.require('./drivers/hipmunk/hipmunk-rail-trip');

vows.describe('HipmunkLeg').addBatch({
  '.parse': {
    topic: function() {
      return document.createElement('div');
    },
    
    'parses a rail trip if the carrier is Amtrak and route number is < 3000': function(leg) {
      $(leg).html('<div class="flightnum">Amtrak #365</div>');

      sinon.spy(HipmunkRailTrip, 'parse');
      HipmunkLeg.parse(leg);
      sinon.assert.called(HipmunkRailTrip.parse);
    },
    'parses a bus trip if the carrier is Amtrak and route number is >= 3000': function(leg) {
      $(leg).html('<div class="flightnum">Amtrak #8365</div>');

      sinon.spy(HipmunkBusTrip, 'parse');
      HipmunkLeg.parse(leg);
      sinon.assert.called(HipmunkBusTrip.parse);
    },
    'parses a flight if the carrier is not Amtrak': function(leg) {
      $(leg).html('<div class="flightnum">American Airlines #456</div>');
      
      sinon.spy(HipmunkFlight, 'parse');
      HipmunkLeg.parse(leg);
      sinon.assert.called(HipmunkFlight.parse);
    }
  }
}).export(module);
