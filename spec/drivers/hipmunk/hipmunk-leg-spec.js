describe('HipmunkLeg', function() {
  var HipmunkLeg = require('drivers/hipmunk/hipmunk-leg'),
      HipmunkBusTrip = require('drivers/hipmunk/hipmunk-bus-trip'),
      HipmunkFlight = require('drivers/hipmunk/hipmunk-flight'),
      HipmunkRailTrip = require('drivers/hipmunk/hipmunk-rail-trip');

  describe('.parse', function() {
    var leg, extension;
    beforeEach(function() {
      extension = {};
      leg = document.createElement('div');
    });
    
    it('parses a rail trip if the carrier is Amtrak and route number is < 3000', function() {
      $(leg).html('<div class="flightnum">Amtrak #365</div>');

      spyOn(HipmunkRailTrip, 'parse');
      HipmunkLeg.parse(extension, leg);
      expect(HipmunkRailTrip.parse).toHaveBeenCalled();
    });
    it('parses a bus trip if the carrier is Amtrak and route number is >= 3000', function() {
      $(leg).html('<div class="flightnum">Amtrak #8365</div>');

      spyOn(HipmunkBusTrip, 'parse');
      HipmunkLeg.parse(extension, leg);
      expect(HipmunkBusTrip.parse).toHaveBeenCalled();
    });
    it('parses a flight if the carrier is not Amtrak', function() {
      $(leg).html('<div class="flightnum">American Airlines #456</div>');
      
      spyOn(HipmunkFlight, 'parse');
      HipmunkLeg.parse(extension, leg);
      expect(HipmunkFlight.parse).toHaveBeenCalled();
    });
  });
});
