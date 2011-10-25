var CM1 = require('CM1');
var Util = require('./util');

var RailTrip = module.exports = function(origin, destination, duration) {
  this.origin = origin;
  this.destination = destination;
  this.duration = duration;
};

CM1.extend(RailTrip, {
  model: 'rail_trip',
  provides: ['origin', 'destination', 'duration', 'rail_class']
});

RailTrip.prototype.rail_class = 'intercity rail';
