var $ = require('jquery');
var Driver = require('../driver');
var OrbitzAirTrafficController = require('./orbitz/orbitz-air-traffic-controller');

var Orbitz = function(extension) {
  this.klass = Orbitz;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new OrbitzAirTrafficController(this, this.doc);
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
