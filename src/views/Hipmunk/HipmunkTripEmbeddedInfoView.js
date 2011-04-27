HipmunkTripEmbeddedInfoView = function(tripElement) {
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
};
HipmunkTripEmbeddedInfoView.prototype = new TripInfoView();

HipmunkTripEmbeddedInfoView.prototype.target = function() {
  return $('.careplane-embedded', this.tripElement);
};

HipmunkTripEmbeddedInfoView.prototype.init = function() {
  this.tripElement.innerHTML += this.content();
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
