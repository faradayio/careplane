var Kayak = require('./kayak');
var KayakUKAirTrafficController = require('./kayak-uk/kayak-uk-air-traffic-controller');

var KayakUK = function(extension) {
  this.klass = KayakUK;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new KayakUKAirTrafficController(this, this.doc);
};
KayakUK.prototype = new Kayak();

KayakUK.driverName = 'KayakUK';

KayakUK.monitorURL = /.*kayak\.co\.uk.*/;
KayakUK.monitorExcludeURL = /fbcdn\.net/;

module.exports = KayakUK;
