var Driver = require('../driver');
var KayakUKAirTrafficController = require('./kayak-uk/kayak-uk-air-traffic-controller');

var KayakUK = function(extension) {
  this.extension = extension;
  this.$ = extension.$;
  this.klass = KayakUK;
  this.atc = new KayakUKAirTrafficController(this.$);
};
KayakUK.prototype = new Driver();

KayakUK.driverName = 'KayakUK';

KayakUK.monitorURL = /.*kayak\.co\.uk.*/;
KayakUK.monitorExcludeURL = /fbcdn\.net/;

KayakUK.prototype.waitForElement = '.flightlist';

KayakUK.prototype.insertAttribution = function() {
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

module.exports = KayakUK;
