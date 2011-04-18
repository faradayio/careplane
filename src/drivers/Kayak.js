Kayak = function(extension) {
  this.extension = extension;
  this.doc = extension.doc;
};
Kayak.prototype = new Driver();

Kayak.driverName = 'Kayak';

Kayak.shouldMonitor = function(url) {
  var match = url.search('kayak.com');
  var staticMatch = url.search('fbcdn.net');
  return match >=0 && staticMatch < 0
};

Kayak.prototype.load = function() {
  var kayak = this;
  var loadInterval = setInterval(function() {
    if(kayak.isActiveSearch()) {
      kayak.extension.notify(Kayak);
      kayak.extension.addStyleSheet();
      kayak.insertAttribution();
      kayak.startAirTrafficControl();
      clearInterval(loadInterval);
    }
  }, 500);
};

Kayak.prototype.isActiveSearch = function() {
  return this.doc.getElementsByClassName('flightlist').length > 0;
};

Kayak.prototype.startAirTrafficControl = function() {
  var controller = new KayakAirTrafficController(this.doc);
  controller.poll();
};

Kayak.prototype.insertAttribution = function() {
  // In the sidebar
  var parentElement = this.doc.getElementById('rightads');
  var referenceElement = this.doc.getElementById('nrAds');
  this.extension.insertBadge(this.doc, parentElement, referenceElement, 'margin-left: 15px !important; margin-bottom: 10px !important;');
  
  // In the footer
  var copyrightElement = Array.prototype.slice.call(this.doc.getElementById('commonfooter').getElementsByTagName('div')).pop();
  attributionElement = this.doc.createElement('span');
  attributionElement.setAttribute('id', 'careplane-attribution');
  attributionElement.innerHTML = ' &middot; ' + this.extension.standardTextAttribution;
  copyrightElement.appendChild(attributionElement);
};
