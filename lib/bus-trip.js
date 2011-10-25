var CM1 = require('CM1');
var Util = require('./util');

var BusTrip = module.exports = function(origin, destination, duration) {
  this.origin = origin;
  this.destination = destination;
  this.duration = duration;
};

CM1.extend(BusTrip, {
  model: 'bus_trip',
  provides: ['origin', 'destination', 'duration', 'bus_class']
});

BusTrip.prototype.bus_class = 'regional coach';
