Hipmunk = function(extension) {
  this.klass = Hipmunk;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new HipmunkAirTrafficController(this.doc);
};
Hipmunk.prototype = new Driver();

Hipmunk.driverName = 'Hipmunk';

Hipmunk.shouldMonitor = function(doc) {
  var match = doc.location.href.search('hipmunk.com/results');
  return match >=0
};

Hipmunk.prototype.isActiveSearch = function() {
  return this.doc.getElementsByClassName('info-panel').length > 0;
};

Hipmunk.prototype.insertAttribution = function() {
  // In the sidebar
  //var parentElement = this.doc.getElementById('rightads');
  //var referenceElement = this.doc.getElementById('nrAds');
  //this.extension.insertBadge(this.doc, parentElement, referenceElement, 'margin-left: 15px !important; margin-bottom: 10px !important;');
  
  // In the footer
  //var copyrightElement = Array.prototype.slice.call(this.doc.getElementById('commonfooter').getElementsByTagName('div')).pop();
  //attributionElement = this.doc.createElement('span');
  //attributionElement.setAttribute('class', 'careplane-attribution-footer hipmunk');
  //attributionElement.innerHTML = ' &middot; ' + this.extension.standardTextAttribution;
  //copyrightElement.appendChild(attributionElement);
};
