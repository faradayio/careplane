var Util = require('./Util');

var BusTrip = function(extension, origin, destination, duration) {
  this.extension = extension;
  this.origin = origin;
  this.destination = destination;
  this.duration = duration;
};

BusTrip.events = {
  emissionEstimateSuccess: function(bus_trip, callback) {
    return function(response) {
      callback(response, bus_trip);
    };
  }
};

BusTrip.prototype.emissionEstimate = function(callback) {
  var params = {
    'key': '423120471f5c355512049b4532b2332f',
    'origin': this.origin,
    'destination': this.destination,
    'duration': this.duration,
    'bus_class': 'regional coach'
  };
  var url = Util.urlFor('http://carbon.brighterplanet.com/bus_trips.json', params);

  this.extension.fetch(url, BusTrip.events.emissionEstimateSuccess(this, callback));
};

module.exports = BusTrip;

