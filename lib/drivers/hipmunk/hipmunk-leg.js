var $ = require('jquery');

var HipmunkBusTrip = require('./hipmunk-bus-trip'),
    HipmunkFlight = require('./hipmunk-flight'),
    HipmunkRailTrip = require('./hipmunk-rail-trip');

var HipmunkLeg = {};

HipmunkLeg.parse = function(leg) {
  var carrier = $('.flightnum', leg).text();

  if(/Amtrak/.test(carrier)) {
    var routeNumber = parseInt(carrier.match(/#(\d+)/)[1]);
    if(routeNumber < 3000)
      return HipmunkRailTrip.parse(leg);
    else
      return HipmunkBusTrip.parse(leg);
  } else {
    return HipmunkFlight.parse(leg);
  }
};

module.exports = HipmunkLeg;
