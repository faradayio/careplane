KayakFlight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
};
KayakFlight.prototype = Flight.prototype;

KayakFlight.parse = function(leg) {
  var segments = $('tr', leg);
  var basicDetails = segments[0].getElementsByTagName('td');
  var airline = basicDetails[1].innerHTML.replace('&nbsp;', '').trim();
  var airports = Array.prototype.map.call(segments, function(segment) {
    return segment.getElementsByClassName('airportCode');
  }).filter(function(item) {
    return item != null;
  });
  var origin = airports[0];
  var destination = airports[0];
  var aircraft = this.parseAircraft(segments);

  return new KayakFlight(origin, destination, airline, aircraft);
};

KayakFlight.parseAircraft = function(segments) {
  var extendedDetails = segments[3].getElementsByTagName('td');
  var fields = extendedDetails[1].innerHTML.split('|');
  for(var i in fields) {
    var field = fields[i];

    if(Flight.isAircraftInfo(field)) {
      return field.replace(/\([^)]*\)/g,'');
    }
  }

  return null;
};
