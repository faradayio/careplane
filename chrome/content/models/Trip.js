Trip = function() {}

Trip.prototype.onFlightEmissionsComplete = function(onTripEmissionsComplete) {
  var trip = this;
  return function(footprint) {
    trip.totalFootprint += footprint;
    trip.footprintParagraph.innerHTML = Careplane.formatFootprint(trip.totalFootprint);
    trip.completedFlightCount++;
    if(onTripEmissionsComplete && trip.isDone())
      onTripEmissionsComplete();
  };
};

Trip.prototype.rate = function(rating) {
  var hue = (rating < 0) ? 0 : 120;
  var saturation = Math.round(Math.abs(rating * 100));
  this.rating = rating;
  var hsl = 'hsl(' + hue + ', ' + saturation + '%, 50%)';
  //Careplane.log('For rating ' + this.rating + ', Setting hsl ' + hsl);
  this.footprintParagraph.style.color = hsl;
};

Trip.prototype.flights = function() { return [new Flight()]; };

Trip.prototype.isDone = function() {
  return this.flights() != null && this.completedFlightCount == this.flights().length;
};

Trip.prototype.isRated = function() {
  return this.rating != null;
};
