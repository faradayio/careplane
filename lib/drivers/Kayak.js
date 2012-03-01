var Driver = require('../driver');
var KayakAirTrafficController = require('./kayak/kayak-air-traffic-controller');

var Kayak = function(extension) {
  this.extension = extension;
  this.$ = extension.$;
  this.klass = Kayak;
  this.atc = new KayakAirTrafficController(this.$);
};
Kayak.prototype = new Driver();

Kayak.driverName = 'Kayak';

Kayak.monitorURL = /.*kayak\.com.*/;
Kayak.monitorExcludeURL = /fbcdn\.net/;

Kayak.prototype.waitForElement = '.flightlist';

Kayak.prototype.insertAttribution = function() {
  // In the sidebar
  var parentElement = this.$('#rightads');
  var referenceElement = this.$('#nrAds');
  this.insertBadge(parentElement, referenceElement, 'kayak');
  
  // In the footer
  var copyrightElement = this.$('#commonfooter div:last');
  attributionElement = this.$('<span />');
  this.$(attributionElement).
    addClass('careplane-attribution-footer kayak').
    html(' &middot; ' + this.standardTextAttribution);
  this.$(copyrightElement).
    append(attributionElement);
};

module.exports = Kayak;
