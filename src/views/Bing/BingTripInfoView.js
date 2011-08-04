var TripInfoView = require('../TripInfoView');

BingTripInfoView = function(tripElement) {
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
};
BingTripInfoView.prototype = new TripInfoView();

BingTripInfoView.prototype.content = function() {
  return "\
    <div class=\"careplane-info\">\
      <p class=\"careplane-search-average-comparison\">...</p>\
      <p class=\"careplane-search-average-analysis\">...</p>\
      <p class=\"careplane-credit\">Calcluation by Brighter Planet</p>\
      <section class=\"careplane-methodologies\">\
        <ul class=\"careplane-methodologies-list\"></ul>\
      </section>\
    </div>";
};

module.exports = BingTripInfoView;
