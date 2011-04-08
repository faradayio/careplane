Trip = function(doc) { this.doc = doc; }

Trip.prototype.addDetails = function(html) {
  if(!this.debugDiv) {
    this.debugDiv = this.doc.createElement('div');
    this.debugDiv.style.display = 'none';
    this.footprintParagraph.parentNode.appendChild(this.debugDiv);
  }

  this.debugDiv.innerHTML += html;
};

Trip.prototype.reportFootprint = function() {
  this.footprintParagraph.innerHTML = Careplane.formatFootprint(this.totalFootprint);
};

Trip.prototype.reportFlightMethodology = function(methodologyUrl, flight) {
  this.addDetails('<a href="' + methodologyUrl + '">Methodology for ' + flight.origin + '-' + flight.destination + '</a>');
};

Trip.prototype.onFlightEmissionsComplete = function(onTripEmissionsComplete) {
  var trip = this;
  return function(cm1Response, flight) {
    trip.totalFootprint += cm1Response.emission;
    trip.reportFootprint();
    trip.reportFlightMethodology(cm1Response.methodology, flight);
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
