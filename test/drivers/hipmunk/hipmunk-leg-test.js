var jsonpath = require('dkastner-JSONPath');

var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon,
    plugin = helper.plugin;

var HipmunkLeg = plugin.require('./drivers/hipmunk/hipmunk-leg'),
    HipmunkBusTrip = plugin.require('./drivers/hipmunk/hipmunk-bus-trip'),
    HipmunkFlight = plugin.require('./drivers/hipmunk/hipmunk-flight'),
    HipmunkRailTrip = plugin.require('./drivers/hipmunk/hipmunk-rail-trip');

var json = JSON.parse(helper.readFixture('hipmunk_dtw_sfo.json'));

vows.describe('HipmunkLeg').addBatch({
  '.parse': {
    'parses a rail trip if the carrier is Amtrak and route number is < 3000': function() {
      var legs = HipmunkLeg.parse(json, 'r-0-7-dcaDnycOmay05Djun13');
      assert.instanceOf(legs[0], HipmunkRailTrip);
    },
    'parses a bus trip if the carrier is Amtrak and route number is >= 3000': function(err, $, leg) {
      var routing = jsonpath.eval(json, '$..routings[?(@.id=="r-0-7-dcaDnycOmay05Djun13")]')[0];
      routing.legs[0].routeNumber = '4578';
      var searchData = [{ routings: [routing] }];
      var legs = HipmunkLeg.parse(searchData, 'r-0-7-dcaDnycOmay05Djun13');
      assert.instanceOf(legs[0], HipmunkBusTrip);
    },
    'parses a flight if the carrier is not Amtrak': function(err, $, leg) {
      var legs = HipmunkLeg.parse(json, 'r-0-0-dtwDsfoOmay05Djun13');
      assert.instanceOf(legs[0], HipmunkFlight);
      assert.instanceOf(legs[1], HipmunkFlight);
    }
  }
}).export(module);
