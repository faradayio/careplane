var Flight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
  this.segments_per_trip = 1;
  this.trips = 1;
}

Flight.prototype.inspect = function() {
    return(this.origin + this.destination + this.airline + this.aircraft);
};

Flight.prototype.emissionEstimate = function(callback, identifier, totalSegments) {
  var url = encodeURI('http://carbon.brighterplanet.com/flights.json?key=' + Careplane.brighterPlanetKey + '&origin_airport=' + this.origin + '&destination_airport=' + this.destination + '&airline=' + this.airline + '&aircraft=' + this.aircraft + '&segments_per_trip=1&trips=1');
  Careplane.fetch(url, function(response) {
      var json = JSON.parse(response);
      callback(json.emission, identifier, totalSegments);
  });
}


