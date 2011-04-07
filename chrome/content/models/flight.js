var Flight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
  this.segments_per_trip = 1;
  this.trips = 1;
}

Flight.isAircraftInfo = function(text) {
  for(var i in Flight.aircraftManufacturers) {
    var mfg = new RegExp(Flight.aircraftManufacturers[i],'im');
    var match = text.match(mfg);
    if(match)
      return true;
  }
  return false;
};

Flight.prototype.inspect = function() {
  return(this.origin + this.destination + this.airline + this.aircraft);
};

Flight.prototype.sanitizedAircraft = function() {
  return this.aircraft.
    replace(/\s+$/,'').
    replace(/^\s+/,'').
    replace(/[\n\r\t\s]+/g, ' ').
    replace(/&nbsp;/g, '');
};

Flight.prototype.emissionEstimate = function(callback) {
  var url = encodeURI('http://carbon.brighterplanet.com/flights.json?key=' + Careplane.brighterPlanetKey + '&origin_airport=' + this.origin + '&destination_airport=' + this.destination + '&airline=' + this.airline + '&segments_per_trip=1&trips=1');
  if(this.aircraft) {
    url += '&aircraft=' + this.sanitizedAircraft();
  }

  var flight = this;
  Careplane.fetch(url, function(response) {
    var json = JSON.parse(response);
    callback(json, flight);
  });
}

Flight.aircraftManufacturers = ['"AERO DESIGN & ENGINEERING CO, US"','AEROSPATIALE',
'AIRBUS','ANTONOV','AVRO','BAE SYSTEMS','BOEING','BOMBARDIER','BRITISH AEROSPACE',
'CANADAIR','CASA','CESSNA','CONVAIR','CURTISS','DASSAULT','DE HAVILLAND',
'DORNIER','EMBRAER','FOKKER','GRUMMAN','GULFSTREAM AEROSPACE','HARBIN',
'HAWKER BEECHCRAFT CORP','HAWKER SIDDELEY','HELIO','IAI','ILYUSHIN','JETSTREAM',
'LET','LOCKHEED','MCDONNELL DOUGLAS','NAMC','NORD','NORTH AMERICAN ROCKWELL',
'PILATUS','PILATUS BRITTENNORMAN','PIPER','ROCKWELL','SAAB','SHORT','SUDEST',
'SWEARINGEN','TUPOLEV','VOLPAR','VULCANAIR','YAKOVLEV'];

