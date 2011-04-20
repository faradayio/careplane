TripFootprintView = function() {};

TripFootprintView.prototype.target = function() {
  return this.footprintParagraph();
};

TripFootprintView.prototype.footprintParagraph = function() {
  return this.footprintParent().getElementsByClassName('careplane-footprint')[0];
}

TripFootprintView.prototype.init = function() {
  var footprintParagraph = this.tripElement.ownerDocument.createElement('p');
  footprintParagraph.setAttribute('class', this.className());
  footprintParagraph.innerHTML = '<i>Loading Careplane footprint &hellip;</i>';

  this.footprintParent().appendChild(footprintParagraph);
};

TripFootprintView.prototype.className = function() {
  return 'careplane-footprint ' + this.driverName().toLowerCase();
};

TripFootprintView.prototype.updateRating = function(rating) {
  var hue = (rating < 0) ? 0 : 120;
  var saturation = Math.round(Math.abs(rating * 100));
  var hsl = 'hsl(' + hue + ', ' + saturation + '%, 50%)';
  this.footprintParagraph().style.color = hsl;
};

TripFootprintView.prototype.update = function(footprint) {
  this.footprintParagraph().innerHTML = Util.formatFootprint(footprint);
};
