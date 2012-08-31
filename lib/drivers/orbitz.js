var Driver = require('../driver');
var OrbitzAirTrafficController = require('./orbitz/orbitz-air-traffic-controller');

var Orbitz = function(extension) {
  this.extension = extension;
  this.$ = extension.$;
  this.klass = Orbitz;
  this.atc = new OrbitzAirTrafficController(this.$);
};
Orbitz.prototype = new Driver();

Orbitz.driverName = 'Orbitz';
Orbitz.monitorURL = /orbitz\.com\/shop\/home.*air.*/;

Orbitz.prototype.waitForElement = '.matchingResults';

Orbitz.prototype.insertAttribution = function() {
  var parentElement = this.$('#leftRail', this.doc);
  this.insertBadge(parentElement, null, 'kayak');
};

module.exports = Orbitz;
