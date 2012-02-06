var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

vows.describe('HipmunkBusTrip').addBatch({
  var HipmunkBusTrip = require('drivers/hipmunk/hipmunk-bus-trip');

  '.parse': {
    'standard bus trip': {
      var bus;
      beforeEach(function() {
        loadFixtures('hipmunk_lan_chi_rail_trip.html');
        bus = HipmunkBusTrip.parse($('.details-padding').get(0));
      });
      'parses origin': function() {
        expect(bus.origin).toBe('LNS');
      });
      'parses destination': function() {
        expect(bus.destination).toBe('BTL');
      });
      'parses duration': function() {
        expect(bus.duration).toBe(4500);
      });
    });
  });
});
