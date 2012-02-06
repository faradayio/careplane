var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

vows.describe('HipmunkLeg').addBatch({
  var HipmunkLeg = require('drivers/hipmunk/hipmunk-leg'),
      HipmunkBusTrip = require('drivers/hipmunk/hipmunk-bus-trip'),
      HipmunkFlight = require('drivers/hipmunk/hipmunk-flight'),
      HipmunkRailTrip = require('drivers/hipmunk/hipmunk-rail-trip');

  '.parse': {
    var leg;
    beforeEach(function() {
      leg = document.createElement('div');
    });
    
    'parses a rail trip if the carrier is Amtrak and route number is < 3000': function() {
      $(leg).html('<div class="flightnum">Amtrak #365</div>');

      spyOn(HipmunkRailTrip, 'parse');
      HipmunkLeg.parse(leg);
      expect(HipmunkRailTrip.parse).toHaveBeenCalled();
    });
    'parses a bus trip if the carrier is Amtrak and route number is >= 3000': function() {
      $(leg).html('<div class="flightnum">Amtrak #8365</div>');

      spyOn(HipmunkBusTrip, 'parse');
      HipmunkLeg.parse(leg);
      expect(HipmunkBusTrip.parse).toHaveBeenCalled();
    });
    'parses a flight if the carrier is not Amtrak': function() {
      $(leg).html('<div class="flightnum">American Airlines #456</div>');
      
      spyOn(HipmunkFlight, 'parse');
      HipmunkLeg.parse(leg);
      expect(HipmunkFlight.parse).toHaveBeenCalled();
    });
  });
});
