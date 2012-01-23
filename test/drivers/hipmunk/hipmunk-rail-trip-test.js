require('./helper');

vows.describe('HipmunkRailTrip').addBatch({
  var HipmunkRailTrip = require('drivers/hipmunk/hipmunk-rail-trip');

  '.parse': {
    'standard rail trip': {
      var rail;
      beforeEach(function() {
        loadFixtures('hipmunk_lan_chi_rail_trip.html');
        rail = HipmunkRailTrip.parse($('.details-padding').get(1));
      });
      'parses origin': function() {
        expect(rail.origin).toBe('BTL');
      });
      'parses destination': function() {
        expect(rail.destination).toBe('CHI');
      });
      'parses duration': function() {
        expect(rail.duration).toBe(11400);
      });
    });
  });
});
