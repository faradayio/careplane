var $ = require('jquery');
var Driver = require('../driver');
var OrbitzAirTrafficController = require('./orbitz/orbitz-air-traffic-controller');

var Orbitz = function($) {
  this.$ = $;
  this.klass = Orbitz;
  this.atc = new OrbitzAirTrafficController($);
};
Orbitz.prototype = new Driver();

Orbitz.driverName = 'Orbitz';
Orbitz.monitorURL = /orbitz\.com\/shop\/home.*type=air/;

Orbitz.prototype.waitForElement = '.matchingResults';

Orbitz.prototype.insertAttribution = function() {
  var parentElement = $('#leftRail', this.doc);
  this.extension.insertBadge(parentElement, null, 'kayak');
};

module.exports = Orbitz;
