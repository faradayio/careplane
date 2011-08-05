var $ = require('jquery-browserify');
var Flight = require('../../Flight');

var KayakFlight = function(extension, origin, destination, airline, aircraft) {
  this.extension = extension;
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
};
KayakFlight.prototype = new Flight();

KayakFlight.parse = function(extension, trs) {
  var flights = [];
  var currentFlight;
  $(trs).each(function(i, tr) {
    var airports = [], aircraft, airportCode, extra;
    tr = $(tr);
    if(tr.hasClass('first')) {
      currentFlight = new KayakFlight(extension);
      var tds = $('td', tr);
      currentFlight.airline = $(tds[tds.length - 2]).text().replace(/\s+/g, ' ').trim();
      flights.push(currentFlight);
    } else if((airportCode = $('td.airportCode', tr)[0])) {
      var code = airportCode.innerHTML;
      currentFlight.origin ?
        currentFlight.destination = code :
        currentFlight.origin = code;
    } else if((extra = $('td.extra', tr)[0])) {
      currentFlight.aircraft = KayakFlight.parseAircraft($(extra).text());
    }
  });

  return flights;
};

KayakFlight.parseAircraft = function(extra) {
  var fields = extra.split('|');
  for(var i in fields) {
    var field = fields[i];

    if(Flight.isAircraftInfo(field)) {
      return field.replace(/\([^)]*\)/g,'').replace(/[\s]+/g,' ').trim();
    }
  }

  return null;
};

module.exports = KayakFlight;
