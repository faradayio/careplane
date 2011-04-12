OrbitzTrip = function(doc, resultNode) {
  this.doc = doc;
  this.resultNode = resultNode;
  this.completedFlightCount = 0;
  this.totalFootprint = 0;

  this.footprintParagraph = this.doc.createElement('p');
  this.footprintParagraph.setAttribute('class', 'careplane-footprint total-footprint');
  this.footprintParagraph.style.color = '#000';
  this.footprintParagraph.style.backgroundColor = '#FFF';
  this.footprintParagraph.style.margin = '0';
  this.footprintParagraph.style.padding = '7px 15px';
  this.footprintParagraph.innerHTML = '<i>Loading Careplane footprint &hellip;</i>';
  this.resultNode.appendChild(this.footprintParagraph);
};
OrbitzTrip.prototype = new Trip();

OrbitzTrip.prototype.flights = function() {
  if(!this._flights) {
    this._flights = [];
    var legs = this.resultNode.getElementsByClassName('resultLeg');
    for(var i = 0; i < legs.length; i++) {
      this._flights.push(OrbitzFlight.parse(legs[i]));
    }
  }
  return this._flights;
}

OrbitzTrip.prototype.score = function(onTripEmissionsComplete) {
  for(var i in this.flights()) {
    var flight = this.flights()[i];
    flight.emissionEstimate(this.onFlightEmissionsComplete(onTripEmissionsComplete));
  }
};
