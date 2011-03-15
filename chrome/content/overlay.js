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

window.addEventListener("load", function () { Careplane.onLoad(); }, false);
