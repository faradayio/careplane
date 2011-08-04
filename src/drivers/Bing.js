var $ = require('jquery-browserify');
var Driver = require('../Driver');
var BingAirTrafficController = require('./Bing/BingAirTrafficController');

Bing = function(extension) {
  this.klass = Bing;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new BingAirTrafficController(this, this.doc);
};
Bing.prototype = new Driver();

Bing.driverName = 'Bing';

Bing.monitorURL = /.*bing\.com\/travel\/flight\/flightSearch.*/;

Bing.prototype.isActiveSearch = function() {
  return $('#searching', this.doc).is(':hidden') &&
    $('#stillSearching', this.doc).is(':hidden');
};

Bing.prototype.insertAttribution = function() {
  // In the sidebar
  var parentElement = $('#bookingAsst', this.doc);
  this.extension.insertBadge(parentElement, null, {
    'margin-left': '15px !important',
    'margin-bottom': '10px !important'
  });
  
  // In the footer
  attributionElement = $(this.doc.createElement('span'));
  attributionElement.addClass('careplane-attribution-footer bing');
  attributionElement.html(this.extension.standardTextAttribution);
  var kayakClone = $('#rbtAttribution', this.doc);
  kayakClone.after(attributionElement);
};

module.exports = Bing;
