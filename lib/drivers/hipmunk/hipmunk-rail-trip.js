var RailTrip = require('../../rail-trip');

var HipmunkRailTrip = function(origin, destination, duration) {
  this.origin = origin;
  this.destination = destination;
  this.duration = duration;
};

HipmunkRailTrip.prototype = new RailTrip();

module.exports = HipmunkRailTrip;
