var BusTrip = require('../../bus-trip');

var HipmunkBusTrip = function(origin, destination, duration) {
  this.origin = origin;
  this.destination = destination;
  this.duration = duration;
};

HipmunkBusTrip.prototype = new BusTrip();

module.exports = HipmunkBusTrip;
