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
