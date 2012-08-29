var Driver = require('../driver');
var BingAirTrafficController = require('./bing/bing-air-traffic-controller');

var Bing = function(extension) {
  this.klass = Bing;
  this.extension = extension;
  this.$ = extension.$;
  this.atc = new BingAirTrafficController(this.$);
};
Bing.prototype = new Driver();

Bing.driverName = 'Bing';

Bing.monitorURL = /.*bing\.com\/travel\/flight/;

Bing.prototype.isActiveSearch = function() {
  return this.$('#searching').is(':hidden');
};

Bing.prototype.insertAttribution = function() {
  // In the sidebar
  var parentElement = this.$('#bookingAssistant');
  this.insertBadge(parentElement, null, 'bing');
  
  // In the footer
  var attributionElement = this.$('<span />');
  this.$(attributionElement).
    addClass('careplane-attribution-footer bing').
    html(this.standardTextAttribution);
  this.$('body').
    append(attributionElement);
};

module.exports = Bing;
