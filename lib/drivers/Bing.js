var Careplane = require('../careplane'),
    Driver = require('../driver');
var BingAirTrafficController = require('./bing/bing-air-traffic-controller');

var Bing = function($) {
  this.klass = Bing;
  this.$ = $;
  this.atc = new BingAirTrafficController($);
};
Bing.prototype = new Driver();

Bing.driverName = 'Bing';

Bing.monitorURL = /.*bing\.com\/travel\/flight\/flightSearch.*/;

Bing.prototype.isActiveSearch = function() {
  //return this.$('#searching').is(':hidden') &&
    //this.$('#stillSearching').is(':hidden');
};

Bing.prototype.insertAttribution = function() {
  // In the sidebar
  var parentElement = this.$('#bookingAsst');
  this.insertBadge(parentElement, null, 'bing');
  
  // In the footer
  var attributionElement = document.createElement('span');
  this.$(attributionElement).
    addClass('careplane-attribution-footer bing').
    html(Careplane.standardTextAttribution);
  this.$('#rbtAttribution').
    after(attributionElement);
};

module.exports = Bing;
