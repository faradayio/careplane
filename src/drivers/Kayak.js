Kayak = function(extension) {
  this.klass = Kayak;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new KayakAirTrafficController(this.doc);
};
Kayak.prototype = new Driver();

Kayak.driverName = 'Kayak';

Kayak.monitorURL = 'kayak.com';
Kayak.monitorExcludeURL = 'fbcdn.net';

Kayak.prototype.isActiveSearch = function() {
  return this.doc.getElementsByClassName('flightlist').length > 0;
};

Kayak.prototype.insertAttribution = function() {
  // In the sidebar
  var parentElement = this.doc.getElementById('rightads');
  var referenceElement = this.doc.getElementById('nrAds');
  Careplane.insertBadge(this.doc, parentElement, referenceElement, 'margin-left: 15px !important; margin-bottom: 10px !important;');
  
  // In the footer
  var copyrightElement = Array.prototype.slice.call(this.doc.getElementById('commonfooter').getElementsByTagName('div')).pop();
  attributionElement = this.doc.createElement('span');
  attributionElement.setAttribute('class', 'careplane-attribution-footer kayak');
  attributionElement.innerHTML = ' &middot; ' + Careplane.standardTextAttribution;
  copyrightElement.appendChild(attributionElement);
};
