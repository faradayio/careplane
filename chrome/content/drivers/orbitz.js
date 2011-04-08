Orbitz = function(doc) {
  this.doc = doc;
  var foo = 'Orbitz';
};
Orbitz.prototype = new Driver();

Orbitz.driverName = 'Orbitz';

Orbitz.shouldMonitor = function(url) {
  var match = url.search('orbitz.com/App/ViewFlightSearchResults');
  return match >= 0;
};

Orbitz.prototype.load = function() {
  Careplane.notify(Orbitz);
  this.insertAttribution();
  this.scoreFlights();
};

Orbitz.prototype.insertAttribution = function() {
  if(this.doc.getElementById('careplane-attribution') == null) {
    // In the matrix
    var parentElement = this.doc.getElementById('matrix');
    if(parentElement) {
      var attributionElement = this.doc.createElement('div');
      attributionElement.setAttribute('id', 'careplane-attribution');
      attributionElement.setAttribute('class', 'matrixFooterAir');
      attributionElement.setAttribute('style', 'padding-left: 4px; padding-bottom: 0;');
      attributionElement.innerHTML = Careplane.standardTextAttribution;
      parentElement.appendChild(attributionElement);
    } else {
      Careplane.log('Unable to find #matrix');
    }
    
    // In the footer
    var footer = this.doc.getElementById('footer');
    var container = this.doc.createElement('div');
    container.setAttribute('style', 'clear: both; margin-top: 5px');
    footer.appendChild(container);
    Careplane.insertBadge(this.doc, container, null, '');
  }
};

Orbitz.prototype.scoreFlights = function() {
  if(this.doc.getElementsByClassName('careplane-footprint').length == 0) {
    //Careplane.log('scoring flights');

    var controller = new OrbitzAirTrafficController(this.doc);
    controller.scoreTrips();
  }
};
