var Kayak = require('./kayak');
var KayakUKAirTrafficController = require('./kayak-uk/kayak-uk-air-traffic-controller');

var KayakUK = function($) {
  this.$ = $;
  this.klass = KayakUK;
  this.atc = new KayakUKAirTrafficController($);
};
KayakUK.prototype = new Kayak();

KayakUK.driverName = 'KayakUK';

KayakUK.monitorURL = /.*kayak\.co\.uk.*/;
KayakUK.monitorExcludeURL = /fbcdn\.net/;

module.exports = KayakUK;
