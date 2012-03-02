var _ = require('underscore'),
    jsonpath = require('dkastner-JSONPath');

var HipmunkBusTrip = require('./hipmunk-bus-trip'),
    HipmunkFlight = require('./hipmunk-flight'),
    HipmunkRailTrip = require('./hipmunk-rail-trip');

var HipmunkLeg = {};

HipmunkLeg.parse = function(searchData, routeId) {
  var routing = jsonpath.eval(searchData, '$..routings[?(@.id=="' + routeId + '")]')[0];
  if(!routing) return [];

  var legs = [];
  _.each(routing.legs, function(leg) {
    if(/Amtrak/.test(leg.aircraft)) {
      if(leg.routeNumber < 3000)
        legs.push(new HipmunkRailTrip(leg.from, leg.to, leg.duration));
      else
        legs.push(new HipmunkBusTrip(leg.from, leg.to, leg.duration));
    } else {
      legs.push(new HipmunkFlight(leg.from, leg.to, leg.airline, leg.aircraft, leg.seatClass));
    }
  });

  return legs;
};

module.exports = HipmunkLeg;
