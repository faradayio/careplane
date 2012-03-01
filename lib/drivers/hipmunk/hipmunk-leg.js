var HipmunkBusTrip = require('./hipmunk-bus-trip'),
    HipmunkFlight = require('./hipmunk-flight'),
    HipmunkRailTrip = require('./hipmunk-rail-trip');

var HipmunkLeg = {};

HipmunkLeg.parse = function($, leg) {
  var carrier = $('.flightnum', leg).text();

  if(/Amtrak/.test(carrier)) {
    var routeNumber = parseInt(carrier.match(/#(\d+)/)[1]);
    if(routeNumber < 3000)
      return this.parseRailTrip($, leg);
    else
      return this.parseBusTrip($, leg);
  } else {
    return this.parseFlight($, leg);
  }
};

HipmunkLeg.parseRailTrip = function($, leg) {
  HipmunkRailTrip.parse($, leg);
};
HipmunkLeg.parseBusTrip = function($, leg) {
  HipmunkBusTrip.parse($, leg);
};
HipmunkLeg.parseFlight = function($, leg) {
  HipmunkFlight.parse($, leg);
};

module.exports = HipmunkLeg;
