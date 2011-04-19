Trip = function() {};

Trip.isAlreadyDiscovered = function(tripElement) {
  var p = tripElement.getElementsByClassName('careplane-footprint');
  return p.length > 0;
};

Trip.prototype.initViews = function() {
  this.footprintView().init();
  this.infoView().init();
};

Trip.prototype.score = function(onScorerFlightEmissionsComplete, onScorerTripEmissionsComplete) {
  this.isScorable = false;
  this.eachFlight(Util.proxy(function(flight) {
    flight.emissionEstimate(
      this.onFlightEmissionsComplete(onScorerFlightEmissionsComplete, onScorerTripEmissionsComplete));
  }, this));
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



// Events
//

Trip.prototype.onFlightEmissionsComplete = function(onScorerFlightEmissionsComplete, onScorerTripEmissionsComplete) {
  return Util.proxy(function(cm1Response, flight) {
    this.totalFootprint += cm1Response.emission;
    this.completedFlightCount++;
    onScorerFlightEmissionsComplete(this, cm1Response, flight);
    if(onScorerTripEmissionsComplete && this.isDone())
      onScorerTripEmissionsComplete();
  }, this);
};
