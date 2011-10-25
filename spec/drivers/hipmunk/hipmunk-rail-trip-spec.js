describe('HipmunkRailTrip', function() {
  var HipmunkRailTrip = require('drivers/hipmunk/hipmunk-rail-trip');

  describe('.parse', function() {
    describe('standard rail trip', function() {
      var rail;
      beforeEach(function() {
        loadFixtures('hipmunk_lan_chi_rail_trip.html');
        rail = HipmunkRailTrip.parse($('.details-padding').get(1));
      });
      it('parses origin', function() {
        expect(rail.origin).toBe('BTL');
      });
      it('parses destination', function() {
        expect(rail.destination).toBe('CHI');
      });
      it('parses duration', function() {
        expect(rail.duration).toBe(11400);
      });
    });
  });
});
