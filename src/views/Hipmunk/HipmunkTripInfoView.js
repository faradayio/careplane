HipmunkTripInfoView = function(tripElement) {
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
};
HipmunkTripInfoView.prototype = new TripInfoView();

HipmunkTripInfoView.prototype.target = function() {
  return this.tripElement.getElementsByClassName('careplane-popup')[0];
};

HipmunkTripInfoView.prototype.content = function() {
  return "\
    <div class=\"careplane-info careplane-popup\">\
      <p class=\"careplane-search-average-comparison\">...</p>\
      <p class=\"careplane-search-average-analysis\">...</p>\
      <p class=\"careplane-credit\">Calcluation by <a href=\"http://brighterplanet.com\">Brighter Planet</a></p>\
      <section class=\"careplane-methodologies\">\
        <ul class=\"careplane-methodologies-list\"></ul>\
      </section>\
    </div>";
};
