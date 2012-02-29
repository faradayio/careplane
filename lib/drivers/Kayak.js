var Careplane = require('../careplane'),
    Driver = require('../driver');
var KayakAirTrafficController = require('./kayak/kayak-air-traffic-controller');

var Kayak = function($) {
  this.$ = $;
  this.klass = Kayak;
  this.atc = new KayakAirTrafficController($);
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
  attributionElement = document.createElement('span');
  this.$(attributionElement).
    addClass('careplane-attribution-footer kayak').
    html(' &middot; ' + Careplane.standardTextAttribution);
  this.$(copyrightElement).
    append(attributionElement);
};

module.exports = Kayak;
