var TripInfoView = require('../trip-info-view');

var KayakTripInfoView = function(tripElement) {
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
};
KayakTripInfoView.prototype = new TripInfoView();

KayakTripInfoView.prototype.content = function() {
  return "\
    <div class=\"careplane-info\">\
      <p class=\"careplane-search-average-comparison\">...</p>\
      <p class=\"careplane-search-average-analysis\">...</p>\
      <p class=\"careplane-credit\">Calculation by Brighter Planet</p>\
      <section class=\"careplane-methodologies\">\
        <ul class=\"careplane-methodologies-list\"></ul>\
      </section>\
    </div>";
};

module.exports = KayakTripInfoView;
