var Kayak = {
  name: 'Kayak',
  searchPattern: /kayak.com(\/flights\/)?/,
  scoreFlights: function() {
    var controller = new KayakAirTrafficController();
    controller.poll();
  },
  insertAttribution: function() {
    // In the sidebar
    var parentElement = Careplane.webDoc.getElementById('rightads');
    var referenceElement = Careplane.webDoc.getElementById('nrAds');
    Careplane.insertBadge(parentElement, referenceElement, 'margin-left: 15px !important; margin-bottom: 10px !important;');
    
    // In the footer
    var copyrightElement = Array.prototype.slice.call(Careplane.webDoc.getElementById('commonfooter').getElementsByTagName('div')).pop();
    attributionElement = Careplane.webDoc.createElement('span');
    attributionElement.setAttribute('id', 'careplane-attribution');
    attributionElement.innerHTML = ' &middot; ' + Careplane.standardTextAttribution;
    copyrightElement.appendChild(attributionElement);
  },
}
