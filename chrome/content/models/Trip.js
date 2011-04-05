Trip = function() {}

Trip.prototype.onFlightEmissionsComplete = function(onTripEmissionsComplete) {
  var self = this;
  return function(footprint) {
    self.totalFootprint += footprint;
    self.footprintParagraph.innerHTML = Careplane.formatFootprint(self.totalFootprint);
    self.completedFlightCount++;
    if(onTripEmissionsComplete && self.completedFlightCount == self.flights().length)
      onTripEmissionsComplete();
  };
};

Trip.prototype.rate = function(rating) {
  var hue = (rating < 0) ? 0 : 120;
  var saturation = Math.round(Math.abs(rating * 100));
  this.rating = rating;
  var hsl = 'hsl(' + hue + ', ' + saturation + '%, 50%)';
  Careplane.log('For rating ' + this.rating + ', Setting hsl ' + hsl);
  this.footprintParagraph.style.color = hsl;
};
