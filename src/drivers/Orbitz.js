Orbitz = function(extension) {
  this.extension = extension;
  this.doc = extension.doc;
};
Orbitz.prototype = new Driver();

Orbitz.driverName = 'Orbitz';

Orbitz.shouldMonitor = function(url) {
  var match = url.search('orbitz.com/App/ViewFlightSearchResults');
  return match >= 0;
};

Orbitz.prototype.load = function() {
  this.extension.notify(Orbitz);
  this.extension.addStyleSheet();
  this.insertAttribution();
  this.startAirTrafficControl();
};

Orbitz.prototype.insertAttribution = function() {
  if(this.doc.getElementsByClassName('careplane-attribution').length == 0) {
    // In the matrix
    var parentElement = this.doc.getElementById('matrix');
    var attributionElement = this.doc.createElement('div');
    attributionElement.setAttribute('class', 'matrixFooterAir careplane-attribution orbitz');
    attributionElement.innerHTML = Careplane.standardTextAttribution;
    parentElement.appendChild(attributionElement);
    
    // In the footer
    var footer = this.doc.getElementById('footer');
    var container = this.doc.createElement('div');
    container.setAttribute('class', 'careplane-attribution-footer orbitz');
    footer.appendChild(container);
    Careplane.insertBadge(this.doc, container, null, '');
  }
};

Orbitz.prototype.startAirTrafficControl = function() {
  //if(this.doc.getElementsByClassName('careplane-footprint').length == 0) {
    var controller = new OrbitzAirTrafficController(this.doc);
    controller.clear();
  //}
};
