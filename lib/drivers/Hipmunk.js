var Driver = require('../driver');
var HipmunkAirTrafficController = require('./hipmunk/hipmunk-air-traffic-controller');

var Hipmunk = function(extension) {
  this.extension = extension;
  this.$ = extension.$;
  this.klass = Hipmunk;
  this.atc = new HipmunkAirTrafficController(this.$);
};
Hipmunk.prototype = new Driver();

Hipmunk.driverName = 'Hipmunk';

Hipmunk.monitorURL = /.*hipmunk\.com.*/;

Hipmunk.prototype.waitForElement = '.results';

module.exports = Hipmunk;
