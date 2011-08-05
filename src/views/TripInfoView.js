var $ = require('jquery-browserify');
var TripStatistics = require('../TripStatistics');
var Util = require('../Util');

var TripInfoView = function() {};

TripInfoView.prototype.target = function() {
  return $('.careplane-info', this.tripElement);
};

TripInfoView.prototype.init = function() {
  $(this.tripElement).append(this.content());
  this.target().hide();
};

TripInfoView.prototype.getElement = function(className) {
  return this.target().find('.' + className);
};

TripInfoView.prototype.updateSearchAverage = function(average, trip) {
  var avgComparison = this.getElement('careplane-search-average-comparison');
  avgComparison.html(Util.footprintComparison(average, trip.totalFootprint));

  var avgAnalysis = this.getElement('careplane-search-average-analysis');
  avgAnalysis.html(Util.footprintAnalysis(average, trip.totalFootprint));
};

TripInfoView.prototype.updateTripAverage = function(trip) {
  TripStatistics.average(trip.origin(), trip.destination(), this.onTripAverageUpdateTripAverageInfo(this, trip));

  var origin = this.getElement('careplane-trip-average-origin');
  origin.html(trip.origin());
  var destination = this.getElement('careplane-trip-average-destination');
  destination.html(trip.destination());
};

TripInfoView.prototype.reportFlightMethodology = function(methodologyUrl, flight) {
  var doc = this.target()[0].ownerDocument;
  var ul = this.getElement('careplane-methodologies-list');
  var li = doc.createElement('li');
  var a = doc.createElement('a');
  a.setAttribute('href', methodologyUrl);
  a.appendChild(doc.createTextNode('Methodology for ' + flight.origin + '-' + flight.destination));
  li.appendChild(a);
  ul.append(li);
};

TripInfoView.prototype.show = function() {
  this.target().show();
};
TripInfoView.prototype.hide = function() {
  this.target().hide();
};

TripInfoView.prototype.positionRelativeTo = function(other) {
  var offset = $(other).offset();
  this.target().css('left', offset.left + 'px');
  this.target().css('top', (offset.top + 20).toString() + 'px');
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

module.exports = TripInfoView;
