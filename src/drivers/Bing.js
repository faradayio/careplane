if(typeof require != 'undefined') {
  var Driver = require('Driver').Driver;
}

Bing = function(extension) {
  this.klass = Bing;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new BingAirTrafficController(this.doc);
};
Bing.prototype = new Driver();

Bing.driverName = 'Bing';

Bing.monitorURL = /.*bing\.com\/travel\/flight\/flightSearch/;

Bing.prototype.waitForElement = '.resultsTable';

Bing.prototype.insertAttribution = function() {
  // In the sidebar
  var parentElement = $('#bookingAsst', this.doc);
  Careplane.insertBadge(parentElement, null, {
    'margin-left': '15px !important',
    'margin-bottom': '10px !important'
  });
  
  // In the footer
  attributionElement = $(this.doc.createElement('span'));
  attributionElement.addClass('careplane-attribution-footer bing');
  attributionElement.html(Careplane.standardTextAttribution);
  var kayakClone = $('#rbtAttribution', this.doc);
  kayakClone.after(attributionElement);
};

if(typeof exports != 'undefined') {
  exports.Bing = Bing;
}
