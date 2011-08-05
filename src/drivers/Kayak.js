var $ = require('jquery-browserify');
var Driver = require('../Driver');
var KayakAirTrafficController = require('./Kayak/KayakAirTrafficController');

var Kayak = function(extension) {
  if(extension) {
    this.klass = Kayak;
    this.extension = extension;
    this.doc = extension.doc;
    this.atc = new KayakAirTrafficController(this, this.doc);
    this.atc.init();
  }
};
Kayak.prototype = new Driver();

Kayak.driverName = 'Kayak';

Kayak.monitorURL = /.*kayak\.com.*/;
Kayak.monitorExcludeURL = /fbcdn\.net/;

Kayak.prototype.waitForElement = '.flightlist';

Kayak.prototype.insertAttribution = function() {
  // In the sidebar
  var parentElement = $('#rightads', this.doc);
  var referenceElement = $('#nrAds', this.doc);
  this.extension.insertBadge(parentElement, referenceElement, {
    'margin-left': '15px !important',
    'margin-bottom': '10px !important' });
  
  // In the footer
  var copyrightElement = $('#commonfooter div:last', this.doc);
  attributionElement = $(this.doc.createElement('span'));
  attributionElement.addClass('careplane-attribution-footer kayak');
  attributionElement.html(' &middot; ' + this.extension.standardTextAttribution);
  copyrightElement.append(attributionElement);
};

module.exports = Kayak;
