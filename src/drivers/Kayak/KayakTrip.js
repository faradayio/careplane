KayakTrip = function(tripElement) {
  this.tripElement = tripElement;
  this.id = this.tripElement.id.replace('tbd', '');
};
KayakTrip.prototype = new Trip();

KayakTrip.prototype.footprintView = function() {
  if(!this._footprintView) {
    this._footprintView = new KayakTripFootprintView(this.tripElement);
  }
  return this._footprintView;
};

KayakTrip.prototype.tripDetailsContainer = function() {
  if(!this._tripDetailsContainer) {
    var inner = this.tripElement.getElementsByClassName('inner')[0]
    this._tripDetailsContainer = inner.children[2];
  }
  return this._tripDetailsContainer;
};

KayakTrip.prototype.searchIdentifier = function() {
  var form = this.tripElement.ownerDocument.forms[0];
  if(form) {
    return form.elements.namedItem('originsid').value;
  }
};

KayakTrip.prototype.eachFlight = function(callback) {
  if(this.tripDetailsContainer().children.length == 0) {
    var trip = this;
    var resultIdentifier = this.tripElement.getElementsByTagName('div')[0].innerHTML;
    var detailUrl = 'http://www.kayak.com/s/flightdetails?searchid=' + this.searchIdentifier() + '&resultid=' + resultIdentifier + '&localidx=' + this.id + '&fs=;';

    Careplane.currentExtension.fetch(detailUrl, function(result) {
      trip.tripDetailsContainer().innerHTML = result;
      trip.tripDetailsContainer().style.display = 'none';
      trip.eachFlight(callback);
    });
  } else {
    for(var i in this.flights()) {
      var flight = this.flights()[i];
      callback(flight);
    }
  }
};

KayakTrip.prototype.flights = function() {
  if(!this._flights || this._flights.length == 0) {
    var outerTable = this.tripElement.getElementsByClassName('flightdetailstable')[0];
    if(outerTable) {
      var legs = Array.prototype.slice.call(outerTable.getElementsByClassName('flightdetailstable'));
      this._flights = []
      for(var i in legs) {
        var leg = legs[i];
        this._flights = this._flights.concat(this.parseFlights(leg));
      }
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
