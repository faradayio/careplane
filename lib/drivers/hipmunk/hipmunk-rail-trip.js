var $ = require('jquery');
var RailTrip = require('../../rail-trip');

var HipmunkRailTrip = function(extension, origin, destination, duration) {
  this.extension = extension;
  this.origin = origin;
  this.destination = destination;
  this.duration = duration;
};

HipmunkRailTrip.prototype = new RailTrip();

HipmunkRailTrip.parse = function(extension, leg) {
  var stations = $('.place', leg);
  var origin = $(stations[0]).text().match(/\(([^\)]+)\)/)[1];
  var destination = $(stations[1]).text().match(/\(([^\)]+)\)/)[1];

  var durationText = $('.time.total', leg).text();
  var durationMatch = durationText.match(/(\d+)h\s*(\d+)m/);
  var hours = parseInt(durationMatch[1]);
  var minutes = parseInt(durationMatch[2]);
  var duration = (hours * 60 + minutes) * 60;

  return new HipmunkRailTrip(extension, origin, destination, duration);
};

module.exports = HipmunkRailTrip;
