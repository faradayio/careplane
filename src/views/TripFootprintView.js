var $ = require('jquery-browserify');
var Util = require('../Util');

var TripFootprintView = function() {};

TripFootprintView.prototype.isValid = function() {
  return true;
};

TripFootprintView.prototype.target = function() {
  return this.footprintParagraph();
};

TripFootprintView.prototype.footprintParagraph = function() {
  return $('.careplane-footprint', this.footprintParent());
}

TripFootprintView.prototype.loadingText = '<i>Loading Careplane footprint &hellip;</i>';

TripFootprintView.prototype.init = function() {
  if(this.footprintParent()) {
    var footprintParagraph = this.tripElement.ownerDocument.createElement('p');
    footprintParagraph.setAttribute('class', this.className());
    $(footprintParagraph).html(this.loadingText);

    this.insertFootprintParagraph(footprintParagraph);
    this.position();
  }
};

TripFootprintView.prototype.position = function() { };

TripFootprintView.prototype.insertFootprintParagraph = function(footprintParagraph) {
  this.footprintParent().append(footprintParagraph);
};

TripFootprintView.prototype.className = function() {
  return 'careplane-footprint ' + this.driverName().toLowerCase();
};

TripFootprintView.prototype.updateRating = function(rating) {
  var hue = (rating < 0) ? 0 : 120;
  var saturation = Math.round(Math.abs(rating * 100));
  var hsl = 'hsl(' + hue + ', ' + saturation + '%, 50%)';
  this.footprintParagraph().css('color', hsl);
};

TripFootprintView.prototype.update = function(footprint) {
  this.footprintParagraph().html(Util.formatFootprint(footprint));
  this.position();
};

TripFootprintView.prototype.show = function() {
  this.target().show();
};
TripFootprintView.prototype.hide = function() {
  this.target().hide();
};

module.exports = TripFootprintView;
