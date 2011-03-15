var Careplane = {
  onLoad: function() {
    this.initialized = true;
    this.drivers = [Kayak, Orbitz];
    this.strings = document.getElementById("careplane-strings");
    var appcontent = document.getElementById("appcontent");   // browser
    if(appcontent)
    appcontent.addEventListener("DOMContentLoaded", this.onPageLoad, true);
  },
  
  onPageLoad: function(ev) {
    var doc = ev.originalTarget;
    var bdoc = top.window.content.document;
    var matchingDrivers = Careplane.drivers.filter(function(driver) {
        return (doc.location.href.search(driver.searchPattern) >= 0);
    });
    if (matchingDrivers.length > 0) {
      var matchingDriver = matchingDrivers[0];
      var storage = bdoc.createElement('ul');
      storage.setAttribute('id', 'careplane-storage');
      storage.setAttribute('style', 'display: none;');
      bdoc.body.appendChild(storage);
      matchingDriver.scoreFlights(doc);
    }
  },
  
  fetch: function(url, callback, matcher) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState==4 && xhr.status==200) {
          var response = xhr.responseText;
          var keyDetail = response.match(matcher)[1];
          callback(response, keyDetail);
      };
    }
    xhr.open('GET', url, true);
    xhr.overrideMimeType('text/xml');
    xhr.send(null);
  },
};

var Flight = function(origin, destination, airline, aircraft) {
    this.origin = origin;
    this.destination = destination;
    this.airline = airline;
    this.aircraft = aircraft;
}

Flight.prototype.inspect = function() {
    return(this.origin + this.destination + this.airline + this.aircraft);
};

Flight.prototype.emissionEstimate = function() {
  return 1.1;
}


var Kayak = {
    name: 'Kayak',
    searchPattern: 'kayak.com/flights/',
    flightClass: 'flightresult',
    scoreFlights: function(doc) {
      var searchIdentifier = doc.forms[0].elements.namedItem('originsid').value;
      var flightElements = Array.prototype.slice.call(doc.getElementsByClassName('flightresult'));
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
      var detailStorage = top.window.content.document.createElement('li');
      detailStorage.setAttribute('id', 'flight-detail-' + localIndex);
      detailStorage.innerHTML = flightDetails;
      top.window.content.document.getElementById('careplane-storage').appendChild(detailStorage);
      var outerTable = top.window.content.document.getElementById('flight-detail-' + localIndex).getElementsByClassName('flightdetailstable')[0];
      var legs = Array.prototype.slice.call(outerTable.getElementsByClassName('flightdetailstable'));
      var segments = legs.map(function(leg) {
          var rows = Array.prototype.slice.call(leg.getElementsByTagName('tr'));
          rows.shift(); // remove "Depart Fri Apr 29 2011"
          var emplanementsCount = ((rows.length + 1) / 3);
          var legSegments = [];
          for (var i = 1; i <= emplanementsCount; i++) {
            var segment = rows.slice((i - 1) * 3, i * 3);
            var basicDetails = segment[0].getElementsByTagName('td');
            var airline = basicDetails[1].getElementsByTagName('nowrap')[0].innerHTML;
            var origin = basicDetails[2].innerHTML.match(/(\([A-Z]{3}\))/)[1];
            var destination = basicDetails[4].innerHTML.match(/(\([A-Z]{3}\))/)[1];
            var extendedDetails = segment[1].getElementsByTagName('td');
            var aircraft = extendedDetails[1].innerHTML.replace(/[\n\r\t]/g, '').match(/([^|]+) \([^|]+\)/)[1];
            legSegments.push(new Flight(origin, destination, airline, aircraft));
          }
          return legSegments;
      }).reduce(function(a, b) { return a.concat(b); }); // flatten
      var footprint = 0;
      segments.forEach(function(segment) {
          footprint = footprint + segment.emissionEstimate();
      });
      var footprintParagraph = top.window.content.document.createElement('p');
      footprintParagraph.setAttribute('class', 'careplane-footprint');
      footprintParagraph.style.color = 'green';
      footprintParagraph.style.position = 'absolute';
      footprintParagraph.style.left = '95px';
      footprintParagraph.style.width = '130px';
      footprintParagraph.style.bottom = '-3px';
      footprintParagraph.innerHTML = footprint + ' kg CO<sub>2</sub>e';
      top.window.content.document.getElementById('flight-' + localIndex).getElementsByClassName('resultbottom')[0].appendChild(footprintParagraph);
    }
}

var Orbitz = {
    name: 'Orbitz',
    searchPattern: 'orbitz.com/App/ViewFlightSearchResults'
}

window.addEventListener("load", function () { Careplane.onLoad(); }, false);
