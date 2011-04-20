TripInfoView = function(tripElement) {
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
};

TripInfoView.prototype.target = function() {
  return this.tripElement.getElementsByClassName('careplane-info')[0];
};

TripInfoView.prototype.init = function() {
  var content = "\
    <div class=\"careplane-info\">\
      <p>Average footprints of this search: <span class=\"careplane-search-average\"></span></p>\
      <p class=\"careplane-search-average-analysis\"></p>\
      <p>Average footprints of flights from <span class=\"careplane-trip-average-origin\"></span> to <span class=\"careplane-trip-average-destination\"></span>: <span class=\"careplane-trip-average\"></span></p>\
      <p class=\"careplane-trip-average-analysis\"></p>\
      <section class=\"careplane-methodologies\">\
        <ul class=\"careplane-methodologies-list\"></ul>\
      </section>\
    </div>";

  this.tripElement.innerHTML += content;
};

TripInfoView.prototype.getElement = function(className) {
  return this.target().getElementsByClassName(className)[0];
};

TripInfoView.prototype.updateSearchAverage = function(average, trip) {
  var span = this.getElement('careplane-search-average');
  span.innerHTML = Util.formatFootprint(average);

  var avgAnalysis = this.getElement('careplane-search-average-analysis');
  Util.setTextChild(avgAnalysis, Util.footprintAnalysis(average, trip.totalFootprint));
};

TripInfoView.prototype.updateTripAverage = function(trip) {
  Trip.average(trip.origin, trip.destination, this.onTripAverageUpdateTripAverageInfo(this, trip));

  var origin = this.getElement('careplane-trip-average-origin');
  Util.setTextChild(origin, trip.origin);
  var destination = this.getElement('careplane-trip-average-destination');
  Util.setTextChild(destination, trip.destination);
};

TripInfoView.prototype.reportFlightMethodology = function(methodologyUrl, flight) {
  var ul = this.getElement('careplane-methodologies-list');
  var li = this.doc.createElement('li');
  var a = this.doc.createElement('a');
  a.setAttribute('href', methodologyUrl);
  a.appendChild(this.doc.createTextNode('Methodology for ' + flight.origin + '-' + flight.destination));
  li.appendChild(a);
  ul.appendChild(li);
};

TripInfoView.prototype.show = function() {
  this.target().style.setAttribute('visibility','visible');
};
TripInfoView.prototype.hide = function() {
  this.target().style.setAttribute('visibility','hidden');
};



// Events

TripInfoView.prototype.onTripAverageUpdateTripAverageInfo = function(tripInfoView, trip) {
  return function(avgFootprint) {
    var avgSpan = tripInfoView.getElement('careplane-trip-average');
    Util.setTextChild(avgSpan, Util.formatFootprint(avgFootprint));

    var avgAnalysis = tripInfoView.getElement('careplane-trip-average-analysis');
    Util.setTextChild(avgAnalysis, Util.footprintAnalysis(avgFootprint, trip.totalFootprint))
  };
};
