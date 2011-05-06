Orbitz = function(extension) {
  this.klass = Orbitz;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new OrbitzAirTrafficController(this.doc);
};
Orbitz.prototype = new Driver();

Orbitz.driverName = 'Orbitz';

Orbitz.shouldMonitor = function(doc) {
  var match = doc.location.href.search('orbitz.com/App/ViewFlightSearchResults');
  return match >= 0 && doc.getElementById('matrix');
};

Orbitz.prototype.load = function() {
  this.extension.notify(this.klass);
  this.extension.addStyleSheet();
  this.insertAttribution();
  this.atc.poll();
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
