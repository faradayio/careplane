KayakTrip = function(tripElement) {
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
  this.id = this.tripElement.id.match(/\d+/)[0];
};
KayakTrip.prototype = new Trip();

KayakTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt($('#priceAnchor' + this.id, this.tripElement).text().replace(/[^0-9]/g,''));

  return this._cost;
};

KayakTrip.prototype.footprintView = function() {
  if(!this._footprintView) {
    this._footprintView = new KayakTripFootprintView(this.tripElement);
  }
  return this._footprintView;
};

KayakTrip.prototype.infoView = function() {
  if(!this._infoView) {
    this._infoView = new KayakTripInfoView(this.tripElement);
  }
  return this._infoView;
};

KayakTrip.prototype.tripDetailsContainer = function() {
  if(!this._tripDetailsContainer)
    this._tripDetailsContainer = this.tripElement.getElementsByClassName('careplane-trip-details')[0]

  return this._tripDetailsContainer;
};

KayakTrip.prototype.searchIdentifier = function() {
  var form = this.tripElement.ownerDocument.forms[0];
  if(form) {
    return form.elements.namedItem('originsid').value;
  }
};

KayakTrip.prototype.eachFlight = function(callback) {
  if(this.tripDetailsContainer()) {
    for(var i in this.flights()) {
      var flight = this.flights()[i];
      callback(flight);
    }
  } else {
    var trip = this;
    var resultIdentifier = this.doc.getElementById('resultid' + this.id).innerHTML;
    var detailUrl = 'http://www.kayak.com/s/run/inlineDetails/flight?searchid=' + this.searchIdentifier() + '&resultid=' + resultIdentifier + '&localidx=' + this.id + '&fs=;';

    Careplane.fetch(detailUrl, function(result) {
      var div = trip.doc.createElement('div');
      div.setAttribute('class', 'careplane-trip-details');
      div.innerHTML = result['message'];
      div.style.display = 'none';
      trip.tripElement.appendChild(div);
      trip.eachFlight(callback);
    });
  }
};

KayakTrip.prototype.flights = function() {
  if(!this._flights || this._flights.length == 0) {
    var outerTable = this.tripElement.getElementsByClassName('careplane-trip-details')[0];
    if(outerTable) {
      this._flights = [];
      var trip = this;
      $('.inlineFlightDetailsLeg', outerTable).each(function(leg) {
        trip._flights = this._flights.concat(this.parseFlights(leg));
      });
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
