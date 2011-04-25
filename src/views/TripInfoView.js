TripInfoView = function() {};

TripInfoView.prototype.target = function() {
  return this.tripElement.getElementsByClassName('careplane-info')[0];
};

TripInfoView.prototype.init = function() {
  this.tripElement.innerHTML += this.content();
  $(this.target()).hide();
};

TripInfoView.prototype.getElement = function(className) {
  return $(this.target()).find('.' + className);
};

TripInfoView.prototype.updateSearchAverage = function(average, trip) {
  var span = this.getElement('careplane-search-average');
  span.html(Util.formatFootprint(average));

  var avgAnalysis = this.getElement('careplane-search-average-analysis');
  avgAnalysis.html(Util.footprintAnalysis(average, trip.totalFootprint));
};

TripInfoView.prototype.updateTripTotal = function(trip) {
  var span = this.getElement('careplane-leg-footprint');
  span.html(Util.formatFootprint(trip.totalFootprint));
};

TripInfoView.prototype.updateTripAverage = function(trip) {
  Trip.average(trip.origin(), trip.destination(), this.onTripAverageUpdateTripAverageInfo(this, trip));

  var origin = this.getElement('careplane-trip-average-origin');
  origin.html(trip.origin());
  var destination = this.getElement('careplane-trip-average-destination');
  destination.html(trip.destination());
};

TripInfoView.prototype.reportFlightMethodology = function(methodologyUrl, flight) {
  var ul = this.getElement('careplane-methodologies-list');
  var li = this.doc.createElement('li');
  var a = this.doc.createElement('a');
  a.setAttribute('href', methodologyUrl);
  a.appendChild(this.doc.createTextNode('Methodology for ' + flight.origin + '-' + flight.destination));
  li.appendChild(a);
  ul.append(li);
};

TripInfoView.prototype.show = function() {
  $(this.target()).show();
};
TripInfoView.prototype.hide = function() {
  $(this.target()).hide();
};

TripInfoView.prototype.positionRelativeTo = function(other) {
  var offset = $(other).offset();
  this.target().style.left = offset.left + 'px';
  this.target().style.top = (offset.top + 20).toString() + 'px';
};



// Events

TripInfoView.prototype.onTripAverageUpdateTripAverageInfo = function(tripInfoView, trip) {
  return function(avgTrip) {
    var avgSpan = tripInfoView.getElement('careplane-trip-average');
    avgSpan.html(Util.formatFootprint(avgTrip.totalFootrpint));

    var avgAnalysis = tripInfoView.getElement('careplane-trip-average-analysis');
    avgAnalysis.html(Util.footprintAnalysis(avgTrip.totalFootprint, trip.totalFootprint));
  };
};
