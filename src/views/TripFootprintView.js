TripFootprintView = function() {};

TripFootprintView.prototype.target = function() {
  return this.footprintParagraph;
};

TripFootprintView.prototype.init = function() {
  this.footprintParagraph = this.tripElement.ownerDocument.createElement('p');
  this.footprintParagraph.setAttribute('class', 'careplane-footprint');
  for(var i in this.style) {
    this.footprintParagraph.style[i] = this.style[i];
  }
  this.footprintParagraph.innerHTML = '<i>Loading Careplane footprint &hellip;</i>';

  this.footprintParent().appendChild(this.footprintParagraph);
};

TripFootprintView.prototype.updateRating = function(rating) {
  var hue = (rating < 0) ? 0 : 120;
  var saturation = Math.round(Math.abs(rating * 100));
  var hsl = 'hsl(' + hue + ', ' + saturation + '%, 50%)';
  this.footprintParagraph.style.color = hsl;
};

TripFootprintView.prototype.update = function(footprint) {
  this.footprintParagraph.innerHTML = Util.formatFootprint(footprint);
};
