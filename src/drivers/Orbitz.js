var $ = require('jquery-browserify');
var Driver = require('../Driver');
var OrbitzAirTrafficController = require('./Orbitz/OrbitzAirTrafficController');

Orbitz = function(extension) {
  this.klass = Orbitz;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new OrbitzAirTrafficController(this, this.doc);
};
Orbitz.prototype = new Driver();

Orbitz.driverName = 'Orbitz';

Orbitz.monitorURL = /orbitz\.com\/App\/ViewFlightSearchResults/;
Orbitz.monitorExcludeURL = /track\.pubmatic\.com/;

Orbitz.prototype.isPollingEnabled = function() {
  return false;
};

Orbitz.prototype.insertAttribution = function() {
  if(this.doc.getElementsByClassName('careplane-attribution').length == 0) {
    // In the matrix
    var parentElement = $('#matrix', this.doc);
    var attributionElement = $(this.doc.createElement('div'));
    attributionElement.addClass('matrixFooterAir careplane-attribution orbitz');
    attributionElement.html(this.extension.standardTextAttribution);
    parentElement.append(attributionElement);
    
    // In the footer
    var footer = $('#footer', this.doc);
    var container = $(this.doc.createElement('div'));
    container.addClass('careplane-attribution-footer orbitz');
    footer.append(container);
    this.extension.insertBadge(container);
  }
};

module.exports = Orbitz;
