var Kayak = {
  name: 'Kayak',
  searchPattern: 'kayak.com/flights/',
  scoreFlights: function() {
    var searchIdentifier = Careplane.webDoc.forms[0].elements.namedItem('originsid').value;
    this.controller = new KayakAirTrafficController(searchIdentifier);
    this.controller.poll();
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



KayakAirTrafficController = function(searchIdentifier) {
  this.searchIdentifier = searchIdentifier;
};

KayakAirTrafficController.prototype.poll = function() {
  setInterval(this.scoreTrips(), 1000);   // every 1 second
}

KayakAirTrafficController.prototype.scoreTrips = function() {
  var self = this;
  return function() {
    var tripElements = Careplane.webDoc.getElementsByClassName('flightresult');
    for(var i = 0; i < tripElements.length; i++) {
      var tripElement = tripElements.item(i);
      var trip = new KayakTrip(tripElement, self.searchIdentifier);
      if(trip.isScorable()) {
        trip.score();
      }
    }
  };
}



KayakTrip = function(tripElement, searchIdentifier) {
  this.tripElement = tripElement;
  this.searchIdentifier = searchIdentifier;
  this.totalFootprint = 0;
  this.completedFlightCount = 0;
};

KayakTrip.prototype.tripDetailsContainer = function() {
  if(!this._tripDetailsContainer) {
    var inner = this.tripElement.getElementsByClassName('inner')[0]
    this._tripDetailsContainer = inner.children[2];
  }
  return this._tripDetailsContainer;
};

KayakTrip.prototype.resultBottom = function() {
  return this.tripElement.getElementsByClassName('resultbottom')[0];
};

KayakTrip.prototype.footprintParagraph = function() {
  return this.resultBottom().getElementsByClassName('careplane-footprint')[0];
}

KayakTrip.prototype.isScorable = function() {
  return this.footprintParagraph() == null;
};

KayakTrip.prototype.score = function() {
  this.createFootprintParagraph();
  this.fetchDetailsAndCalculateFootprint();
};

KayakTrip.prototype.createFootprintParagraph = function() {
  var footprintParagraph = Careplane.webDoc.createElement('p');
  footprintParagraph.setAttribute('class', 'careplane-footprint');
  footprintParagraph.style.color = '#aaa';
  footprintParagraph.style.position = 'absolute';
  footprintParagraph.style.left = '10px';
  footprintParagraph.style.width = '130px';
  footprintParagraph.style.bottom = '20px';
  footprintParagraph.innerHTML = '';

  this.resultBottom().appendChild(footprintParagraph);
};

KayakTrip.prototype.fetchDetailsAndCalculateFootprint = function() {
  var resultIdentifier = this.tripElement.getElementsByTagName('div')[0].innerHTML;
  var localIndex = this.tripElement.id.replace('tbd', '');
  var detailUrl = 'http://www.kayak.com/s/flightdetails?searchid=' + this.searchIdentifier + '&resultid=' + resultIdentifier + '&localidx=' + localIndex + '&fs=;';

  if(this.tripDetailsContainer().children.length == 0) {
    var self = this;
    Careplane.fetch(detailUrl, function(result) {
      Careplane.log('Fetching trip data from ' + detailUrl);
      self.tripDetailsContainer().innerHTML = result;
      self.calculateFootprint();
    });
  } else {
    this.calculateFootprint();
  }
};

KayakTrip.prototype.flights = function() {
  if(!this._flights) {
    var outerTable = this.tripElement.getElementsByClassName('flightdetailstable')[0];
    Careplane.log('Getting flights from outerTable ' + outerTable);
    var legs = Array.prototype.slice.call(outerTable.getElementsByClassName('flightdetailstable'));
    this._flights = []
    for(var i in legs) {
      var leg = legs[i];
      this._flights = this._flights.concat(this.parseFlights(leg));
    }
  }
  return this._flights;
}

KayakTrip.prototype.parseFlights = function(leg) {
  var rows = Array.prototype.slice.call(leg.getElementsByTagName('tr'));
  return this.flightIndices(rows).map(function(i) {
    var flight = rows.slice(i, i + 3);
    return KayakFlight.parse(flight);
  });
};

KayakTrip.prototype.flightIndices = function(rows) {
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
};

KayakTrip.prototype.calculateFootprint = function() {
  for(var i in this.flights()) {
    var flight = this.flights()[i];
    flight.emissionEstimate(this.updateEmissionEstimate());
  }
};

KayakTrip.prototype.updateEmissionEstimate = function() {
  var self = this;
  return function(footprint) {
    self.totalFootprint += footprint;
    self.footprintParagraph().innerHTML = Careplane.formatFootprint(self.totalFootprint);
    self.completedFlightCount++;

    if(self.completedFlightCount == self.flights().length)
      self.footprintParagraph().style.color = '#000';
  };
};


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
  var aircraft = this.parseAircraft(segment);

  return new KayakFlight(origin, destination, airline, aircraft);
};

KayakFlight.parseAircraft = function(segment) {
  var extendedDetails = segment[1].getElementsByTagName('td');
  var fields = extendedDetails[1].innerHTML.split('|');
  for(var i in fields) {
    var field = fields[i];

    if(Flight.isAircraftInfo(field)) {
      return field.replace(/\([^)]*\)/g,'');
    }
  }

  return null;
};
