OrbitzTripInfoView = function(tripElement) {
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
};
OrbitzTripInfoView.prototype = new TripInfoView();

OrbitzTripInfoView.prototype.content = function() {
  return "\
    <div class=\"careplane-info\">\
      <p class=\"careplane-search-average-comparison\">...</p>\
      <p class=\"careplane-search-average-analysis\"></p>\
      <p class=\"careplane-credit\">Calcluation by Brighter Planet</p>\
      <section class=\"careplane-methodologies\">\
        <ul class=\"careplane-methodologies-list\"></ul>\
      </section>\
    </div>";
};

OrbitzTripInfoView.prototype.positionRelativeTo = function(other) {
  var position = $(other).position();
  this.target().css('left', (position.left + 20).toString() + 'px');
  this.target().css('top', (position.top + 20).toString() + 'px');
};
