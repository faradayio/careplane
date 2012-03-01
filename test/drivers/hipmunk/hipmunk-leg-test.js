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
      var t = this;
      helper.inQweryBrowser(function(err, $) {
        t.callback(err, $, $('<div />'));
      });
    },
    
    'parses a rail trip if the carrier is Amtrak and route number is < 3000': function(err, $, leg) {
      leg.html('<div class="flightnum">Amtrak #365</div>');

      var mock = sinon.mock(HipmunkLeg);
      mock.expects('parseRailTrip').once();
      HipmunkLeg.parse($, leg);
      mock.verify();
    },
    'parses a bus trip if the carrier is Amtrak and route number is >= 3000': function(err, $, leg) {
      leg.html('<div class="flightnum">Amtrak #8365</div>');

      var mock = sinon.mock(HipmunkLeg);
      mock.expects('parseBusTrip').once();
      HipmunkLeg.parse($, leg);
      mock.verify();
    },
    'parses a flight if the carrier is not Amtrak': function(err, $, leg) {
      leg.html('<div class="flightnum">American Airlines #456</div>');
      
      var mock = sinon.mock(HipmunkLeg);
      mock.expects('parseFlight').once();
      HipmunkLeg.parse($, leg);
      mock.verify();
    }
  }
}).export(module);
