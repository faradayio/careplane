var Kayak = {
    name: 'Kayak',
    searchPattern: 'kayak.com/flights/',
    scoreFlights: function() {
      var storage = Careplane.webDoc.createElement('ul');
      storage.setAttribute('id', 'careplane-storage');
      storage.setAttribute('style', 'display: none;');
      Careplane.webDoc.body.appendChild(storage);

      var searchIdentifier = Careplane.webDoc.forms[0].elements.namedItem('originsid').value;
      var flightElements = Array.prototype.slice.call(Careplane.webDoc.getElementsByClassName('flightresult'));
      flightElements.forEach(function(flight) {
        Kayak.scoreFlight(flight, searchIdentifier);
      });
    },
    scoreFlight: function(flightElement, searchIdentifier) {
      var localIndex = flightElement.id.replace('tbd', '');
      var resultIdentifier = flightElement.getElementsByTagName('div')[0].innerHTML;
      flightElement.setAttribute('id', 'flight-' + localIndex);
      var flightDetails = 'http://www.kayak.com/s/flightdetails?searchid=' + searchIdentifier + '&resultid=' + resultIdentifier + '&localidx=' + localIndex + '&fs=;';
      Careplane.fetch(flightDetails, Kayak.handleFlightDetails, /fdetailsdiv(\d+)/);
    },
    handleFlightDetails: function(flightDetails, localIndex) {
      var detailStorage = Careplane.webDoc.createElement('li');
      detailStorage.setAttribute('id', 'flight-detail-' + localIndex);
      detailStorage.innerHTML = flightDetails;
      Careplane.webDoc.getElementById('careplane-storage').appendChild(detailStorage);
      var flightDetail = Careplane.webDoc.getElementById('flight-detail-' + localIndex);
      var outerTable = flightDetail.getElementsByClassName('flightdetailstable')[0];
      var legs = Array.prototype.slice.call(outerTable.getElementsByClassName('flightdetailstable'));
      var segments = legs.map(Kayak.parseLeg).
        reduce(function(a, b) { return a.concat(b); }); // flatten
      footprintParagraph = Kayak.createFootprintP(localIndex);
      Careplane.webDoc.getElementById('flight-' + localIndex).getElementsByClassName('resultbottom')[0].appendChild(footprintParagraph);
      segments.forEach(function(segment) {
          segment.emissionEstimate(Kayak.insertEmissionEstimate, localIndex, segments.length);
      });
    },

    parseLeg: function(leg) {
      var rows = Array.prototype.slice.call(leg.getElementsByTagName('tr'));
      rows.shift(); // remove "Depart Fri Apr 29 2011"
      var emplanementsCount = ((rows.length + 1) / 3);
      var legSegments = Kayak.segmentIndices(rows).map(function(i) {
        var segment = rows.slice(i, i + 3);
        return KayakFlight.parse(segment);
      });
      return legSegments;
    },

    segmentIndices: function(rows) {
      var list = [];
      for(var i in rows) {
        var row = rows[i];
        if(row.children.length > 1) {
          var firstTd = row.getElementsByTagName('td')[0];
          var imgs = firstTd.getElementsByTagName('img');

          if(imgs.length > 0)
            list.push(i);
        }
      }
      return list;
    },

    createFootprintP: function(localIndex) {
      var footprintParagraph = Careplane.webDoc.createElement('p');
      footprintParagraph.setAttribute('class', 'careplane-footprint');
      footprintParagraph.setAttribute('id', 'flight-footprint-' + localIndex);
      footprintParagraph.style.color = '#aaa';
      footprintParagraph.style.position = 'absolute';
      footprintParagraph.style.left = '10px';
      footprintParagraph.style.width = '130px';
      footprintParagraph.style.bottom = '20px';

      return footprintParagraph;
    },
    insertEmissionEstimate: function(footprint, localIndex, totalSegments) {
      Careplane.insertEmissionEstimate(footprint, 'flight-footprint-' + localIndex, totalSegments);
    },
    hideEmissionEstimates: function() {
      Array.prototype.slice.call(Careplane.webDoc.getElementsByClassName('careplane-footprint')).forEach(function(el) { el.setAttribute('style', 'display: none'); });
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


KayakFlight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
};
KayakFlight.prototype = Flight.prototype;

KayakFlight.parse = function(segment) {
  var basicDetails = segment[0].getElementsByTagName('td');
  var airline = basicDetails[1].getElementsByTagName('nowrap')[0].innerHTML.replace('&nbsp;', '').trim();
  var origin = basicDetails[2].innerHTML.match(/(\([A-Z]{3}\))/)[1].substr(1,3);
  var destination = basicDetails[4].innerHTML.match(/(\([A-Z]{3}\))/)[1].substr(1,3);
  var extendedDetails = segment[1].getElementsByTagName('td');
  var aircraft = extendedDetails[1].innerHTML.replace(/[\n\r\t]/g, '').match(/([^|]+) \([^|]+\)/)[1].replace('&nbsp;', '').trim();

  return new KayakFlight(origin, destination, airline, aircraft);
};
