var Driver = require('../driver');
var HipmunkAirTrafficController = require('./hipmunk/hipmunk-air-traffic-controller');

var Hipmunk = function(extension) {
  this.klass = Hipmunk;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new HipmunkAirTrafficController(this, this.doc);
};
Hipmunk.prototype = new Driver();

Hipmunk.driverName = 'Hipmunk';

Hipmunk.monitorURL = /.*hipmunk\.com.*/;

Hipmunk.prototype.waitForElement = '.info-panel';

module.exports = Hipmunk;
