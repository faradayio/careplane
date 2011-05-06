Kayak = function(extension) {
  this.klass = Kayak;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new KayakAirTrafficController(this.doc);
};
Kayak.prototype = new Driver();

Kayak.driverName = 'Kayak';

Kayak.shouldMonitor = function(doc) {
  var match = doc.location.href.search('kayak.com');
  var staticMatch = doc.location.href.search('fbcdn.net');
  return match >=0 && staticMatch < 0
};

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
