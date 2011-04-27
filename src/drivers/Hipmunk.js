Hipmunk = function(extension) {
  this.extension = extension;
  this.doc = extension.doc;
};
Hipmunk.prototype = new Driver();

Hipmunk.driverName = 'Hipmunk';

Hipmunk.shouldMonitor = function(url) {
  var match = url.search('hipmunk.com/results');
  return match >=0
};

Hipmunk.prototype.load = function() {
  var hipmunk = this;
  var loadInterval = setInterval(function() {
    if(hipmunk.isActiveSearch()) {
      hipmunk.extension.notify(Hipmunk);
      hipmunk.extension.addStyleSheet();
      hipmunk.insertAttribution();
      hipmunk.startAirTrafficControl();
      clearInterval(loadInterval);
    }
  }, 500);
};

Hipmunk.prototype.isActiveSearch = function() {
  return this.doc.getElementsByClassName('info-panel').length > 0;
};

Hipmunk.prototype.startAirTrafficControl = function() {
  var controller = new HipmunkAirTrafficController(this.doc);
  controller.poll();
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
