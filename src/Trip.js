Trip = function() {};
Trip.prototype.totalFootprint = 0;
Trip.prototype.completedFlightCount = 0;
Trip.prototype.isScorable = true;

Trip._averages = [];
Trip.average = function(origin, destination, callback) {
  var trip = Array.prototype.filter.call(Trip._averages, function(trip) {
    return trip.origin == origin && trip.destination == destination;
  });
  if(trip.length > 0) {
    callback(trip[0].totalFootprint);
  } else {
    trip = new AverageTrip(origin, destination);
    trip.score(function() {}, callback);
  }
};

Trip.isAlreadyDiscovered = function(tripElement) {
  var p = tripElement.getElementsByClassName('careplane-info');
  return p.length > 0;
};

Trip.prototype.initViews = function() {
  this.footprintView().init();
  this.infoView().init();
};

Trip.prototype.eachFlight = function(callback) {
  for(var i in this.flights()) {
    callback(this.flights()[i]);
  }
};

Trip.prototype.score = function(flightEmissionsCallback, tripEmissionsCallback) {
  this.isScorable = false;
  var trip = this;
  this.eachFlight(function(flight) {
    flight.emissionEstimate(
      TripEvents.flightEmissionsComplete(trip, flightEmissionsCallback, tripEmissionsCallback));
  });
}

Trip.prototype.rate = function(rating) {
  this.rating = rating;
};

Trip.prototype.isDone = function() {
  return this.flights() != null && this.completedFlightCount == this.flights().length;
};

Trip.prototype.controller = function() {
  if(!this._controller) {
    this._controller = new TripController(this);
  }
  return this._controller;
};

Trip.prototype.infoView = function() {
  if(!this._infoView) {
    this._infoView = new TripInfoView(this.tripElement);
  }
  return this._infoView;
};

Trip.prototype.tallyFootprint = function(emission) {
  this.totalFootprint += emission;
  this.completedFlightCount++;
};

Trip.prototype.roundedTotalFootprint = function() {
  return Math.round(this.totalFootprint);
};
