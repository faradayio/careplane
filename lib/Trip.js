var Trip = function(id, $, tripElement) {
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
    return function(err, estimate) {
      if(err) {
        console.log('Failed to get emissions for ',trip,'-',err);
        return;
      }

      trip.tallyFootprint(estimate.carbon);
      callback(trip, estimate);
      if(onTripEmissionsComplete && trip.isDone())
        onTripEmissionsComplete(trip, estimate);
    };
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
    flight.getImpacts(
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

module.exports = Trip;
