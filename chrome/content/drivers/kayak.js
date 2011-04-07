Kayak = function(doc) { this.doc = doc; };
Kayak.prototype = new Driver();

Kayak.name = 'Kayak';

Kayak.shouldMonitor = function(url) {
  var match = url.search('kayak.com');
  var staticMatch = url.search('fbcdn.net');
  return match >=0 && staticMatch < 0
};

Kayak.prototype.load = function() {
  var kayak = this;
  var loadInterval = setInterval(function() {
    if(kayak.isActiveSearch()) {
      Careplane.notify(Kayak);
      kayak.insertAttribution();
      kayak.scoreFlights();
      clearInterval(loadInterval);
    }
  }, 500);
};

Kayak.prototype.isActiveSearch = function() {
  return this.doc.getElementsByClassName('flightlist').length > 0;
};

Kayak.prototype.scoreFlights = function() {
  Careplane.log('starting kayak');
  var controller = new KayakAirTrafficController(this.doc);
  controller.poll();
};

Kayak.prototype.insertAttribution = function() {
  // In the sidebar
  var parentElement = this.doc.getElementById('rightads');
  var referenceElement = this.doc.getElementById('nrAds');
  Careplane.insertBadge(this.doc, parentElement, referenceElement, 'margin-left: 15px !important; margin-bottom: 10px !important;');
  
  // In the footer
  var copyrightElement = Array.prototype.slice.call(this.doc.getElementById('commonfooter').getElementsByTagName('div')).pop();
  attributionElement = this.doc.createElement('span');
  attributionElement.setAttribute('id', 'careplane-attribution');
  attributionElement.innerHTML = ' &middot; ' + Careplane.standardTextAttribution;
  copyrightElement.appendChild(attributionElement);
};
