var TripInfoView = require('../trip-info-view');

var HipmunkTripEmbeddedInfoView = function($, tripElement) {
  this.$ = $;
  this.tripElement = tripElement;
};
HipmunkTripEmbeddedInfoView.prototype = new TripInfoView();

HipmunkTripEmbeddedInfoView.prototype.target = function() {
  return this.$('.careplane-embedded', this.tripElement);
};

HipmunkTripEmbeddedInfoView.prototype.init = function() {
  if(this.tripElement)
    this.$(this.tripElement).append(this.content());
};

HipmunkTripEmbeddedInfoView.prototype.content = function() {
  return "\
    <div class=\"leg careplane-info careplane-embedded\">\
      <p class=\"careplane-search-average-comparison\">...</p>\
      <p class=\"careplane-search-average-analysis\">...</p>\
      <section class=\"careplane-methodologies\">\
        <ul class=\"careplane-methodologies-list\"></ul>\
      </section>\
    </div>";
};

module.exports = HipmunkTripEmbeddedInfoView;
