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
          var keyDetail = ((matcher) ? response.match(matcher)[1] : false);
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

Flight.prototype.emissionEstimate = function(callback, identifier) {
  var url = encodeURI('http://carbon.brighterplanet.com/flights.json?origin_airport=' + this.origin + '&destination_airport=' + this.destination + '&airline=' + this.airline + '&aircraft=' + this.aircraft);
//  alert(url);
  Careplane.fetch(url, function(response) {
      var json = JSON.parse(response);
      callback(json.emission, identifier);
  });
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
            var airline = basicDetails[1].getElementsByTagName('nowrap')[0].innerHTML.replace('&nbsp;', '').trim();
            var origin = basicDetails[2].innerHTML.match(/(\([A-Z]{3}\))/)[1].substr(1,3);
            var destination = basicDetails[4].innerHTML.match(/(\([A-Z]{3}\))/)[1].substr(1,3);
            var extendedDetails = segment[1].getElementsByTagName('td');
            var aircraft = extendedDetails[1].innerHTML.replace(/[\n\r\t]/g, '').match(/([^|]+) \([^|]+\)/)[1].replace('&nbsp;', '').trim();
            legSegments.push(new Flight(origin, destination, airline, aircraft));
          }
          return legSegments;
      }).reduce(function(a, b) { return a.concat(b); }); // flatten
      var footprintParagraph = top.window.content.document.createElement('p');
      footprintParagraph.setAttribute('class', 'careplane-footprint');
      footprintParagraph.setAttribute('id', 'flight-footprint-' + localIndex);
      footprintParagraph.style.color = 'green';
      footprintParagraph.style.position = 'absolute';
      footprintParagraph.style.left = '95px';
      footprintParagraph.style.width = '130px';
      footprintParagraph.style.bottom = '-3px';
      top.window.content.document.getElementById('flight-' + localIndex).getElementsByClassName('resultbottom')[0].appendChild(footprintParagraph);
      segments.forEach(function(segment) {
          segment.emissionEstimate(Kayak.insertEmissionEstimate, localIndex);
      });
    },
    insertEmissionEstimate: function(footprint, localIndex) {
      var footprintParagraph = top.window.content.document.getElementById('flight-footprint-' + localIndex);
      var existingFootprint = Number(footprintParagraph.innerHTML);
      footprintParagraph.innerHTML = existingFootprint + Number(footprint);
    }
}

var Orbitz = {
    name: 'Orbitz',
    searchPattern: 'orbitz.com/App/ViewFlightSearchResults'
}

window.addEventListener("load", function () { Careplane.onLoad(); }, false);
