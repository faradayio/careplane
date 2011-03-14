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
    var matchingDrivers = Careplane.drivers.filter(function(driver) {
        return (doc.location.href.search(driver.searchPattern) >= 0);
    });
    if (matchingDrivers.length > 0) {
      matchingDriver = matchingDrivers[0];
      matchingDriver.scoreFlights(doc);
    }
  },
  
  Flight: function(origin, destination, airline, aircraft) {
    this.origin = origin;
    this.destination = destination;
    this.airline = airline;
    this.aircraft = aircraft;
  }
};

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
      var resultIdentifier = flightElement.getElementsByTagName('div')[0].innerHTML;
      flightElement.setAttribute('data-resultIdentifier', resultIdentifier);
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = Kayak.handleFlightDetails;
      xhr.open('GET','http://www.kayak.com/s/flightdetails?searchid=P5LdtD&resultid=12afe73d1a3cf50b76d4fd45882450ec&localidx=259&fs=;', true);
      xhr.send(null);
    },
    handleFlightDetails: function() {
      
    }
}

var Orbitz = {
    name: 'Orbitz',
    searchPattern: 'orbitz.com/App/ViewFlightSearchResults'
}

window.addEventListener("load", function () { Careplane.onLoad(); }, false);
