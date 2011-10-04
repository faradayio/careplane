var Util = require('./util');

var RailTrip = function(extension, origin, destination, duration) {
  this.extension = extension;
  this.origin = origin;
  this.destination = destination;
  this.duration = duration;
};

RailTrip.events = {
  emissionEstimateSuccess: function(rail_trip, callback) {
    return function(response) {
      callback(response, rail_trip);
    };
  }
};

RailTrip.prototype.emissionEstimate = function(callback) {
  var params = {
    'key': '423120471f5c355512049b4532b2332f',
    'origin': this.origin,
    'destination': this.destination,
    'duration': this.duration,
    'rail_class': 'intercity rail'
  };
  var url = Util.urlFor('http://carbon.brighterplanet.com/rail_trips.json', params);

  this.extension.fetch(url, RailTrip.events.emissionEstimateSuccess(this, callback));
};

module.exports = RailTrip;

