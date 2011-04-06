var Orbitz = {
  name: 'Orbitz',
  searchPattern: 'orbitz.com/App/ViewFlightSearchResults',

  insertAttribution: function() {
    if(Careplane.webDoc.getElementById('careplane-attribution') == null) {
      // In the matrix
      var parentElement = Careplane.webDoc.getElementById('matrix');
      if(parentElement) {
        var attributionElement = Careplane.webDoc.createElement('div');
        attributionElement.setAttribute('id', 'careplane-attribution');
        attributionElement.setAttribute('class', 'matrixFooterAir');
        attributionElement.setAttribute('style', 'padding-left: 4px; padding-bottom: 0;');
        attributionElement.innerHTML = Careplane.standardTextAttribution;
        parentElement.appendChild(attributionElement);
      } else {
        Careplane.log('Unable to find #matrix');
      }
      
      // In the footer
      var footer = Careplane.webDoc.getElementById('footer');
      var container = Careplane.webDoc.createElement('div');
      container.setAttribute('style', 'clear: both; margin-top: 5px');
      footer.appendChild(container);
      Careplane.insertBadge(container, null, '');
    }
  },

  scoreFlights: function(doc, bdoc) {
    if(Careplane.webDoc.getElementsByClassName('careplane-footprint').length == 0) {
      //Careplane.log('scoring flights');

      var controller = new OrbitzAirTrafficController();
      controller.scoreTrips();
    }
  }
};
