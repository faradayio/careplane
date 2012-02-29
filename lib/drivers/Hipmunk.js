var Driver = require('../driver');
var HipmunkAirTrafficController = require('./hipmunk/hipmunk-air-traffic-controller');

var Hipmunk = function($) {
  this.$ = $;
  this.klass = Hipmunk;
  this.atc = new HipmunkAirTrafficController($);
};
Hipmunk.prototype = new Driver();

Hipmunk.driverName = 'Hipmunk';

Hipmunk.monitorURL = /.*hipmunk\.com.*/;

Hipmunk.prototype.waitForElement = '.info-panel';

module.exports = Hipmunk;
