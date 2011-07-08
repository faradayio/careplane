Trip = function(tripElement) {
  this.totalFootprint = 0;
  this.completedFlightCount = 0;
  this.isScorable = false;
};

Trip.prototype.isValid = function() {
  return this.footprintView.isValid();
};

Trip.events = {
  flightsLoaded: function(trip) {
    trip.isScorable = true;
  },

  flightEmissionsComplete: function(trip, callback, onTripEmissionsComplete) {
    return function(cm1Response, flight) {
      trip.tallyFootprint(cm1Response.emission);
      callback(trip, cm1Response, flight);
      if(onTripEmissionsComplete && trip.isDone())
        onTripEmissionsComplete(trip, cm1Response, flight);
    };
  }
};

Trip._averages = [];
Trip.average = function(origin, destination, callback) {
  var trip = Array.prototype.filter.call(this._averages, function(trip) {
    return trip.origin() == origin && trip.destination() == destination;
  });
  if(trip.length > 0) {
    callback(trip[0]);
  } else {
    trip = new AverageTrip(origin, destination);
    this._averages.push(trip);
    trip.score(function() {}, callback);
  }
};

Trip.prototype.origin = function() {
  return this.flights[0].origin;
};
Trip.prototype.destination = function() {
  return this.flights[this.flights.length - 1].destination;
};

Trip.prototype.init = function() {
  this.loadFlights(Trip.events.flightsLoaded);
};

Trip.prototype.initViews = function() {
  this.footprintView.init();
  this.infoView.init();
};

Trip.prototype.eachFlight = function(callback) {
  for(var i in this.flights) {
    callback(this.flights[i]);
  }
};

Trip.prototype.score = function(flightEmissionsCallback, tripEmissionsCallback) {
  this.isScorable = false;
  var trip = this;
  this.eachFlight(function(flight) {
    flight.emissionEstimate(
      Trip.events.flightEmissionsComplete(trip, flightEmissionsCallback, tripEmissionsCallback));
  });
};

Trip.prototype.rate = function(rating) {
  this.rating = rating;
};

Trip.prototype.isDone = function() {
  return this.flights != null && this.completedFlightCount == this.flights.length;
};

Trip.prototype.tallyFootprint = function(emission) {
  this.totalFootprint += emission;
  this.completedFlightCount++;
};

Trip.prototype.roundedTotalFootprint = function() {
  return Math.round(this.totalFootprint);
};
