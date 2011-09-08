describe('HipmunkBusTrip', function() {
  var HipmunkBusTrip = require('drivers/Hipmunk/HipmunkBusTrip');

  describe('.parse', function() {
    describe('standard bus trip', function() {
      var bus;
      beforeEach(function() {
        loadFixtures('hipmunk_lan_chi_rail_trip.html');
        bus = HipmunkBusTrip.parse({}, $('.details-padding').get(0));
      });
      it('parses origin', function() {
        expect(bus.origin).toBe('LNS');
      });
      it('parses destination', function() {
        expect(bus.destination).toBe('BTL');
      });
      it('parses duration', function() {
        expect(bus.duration).toBe(4500);
      });
    });
  });
});
