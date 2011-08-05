var Kayak = require('./Kayak');
var KayakUKAirTrafficController = require('./KayakUK/KayakUKAirTrafficController');

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
