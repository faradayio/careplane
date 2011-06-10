Flight = function(origin, destination, airline, aircraft) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
  this.aircraft = aircraft;
}

Flight.events = {
  emissionEstimateSuccess: function(flight, callback) {
    return function(response) {
      callback(response, flight);
    };
  }
};

Flight.isAircraftInfo = function(text) {
  for(var i in Flight.aircraftManufacturers) {
    var mfg = new RegExp(Flight.aircraftManufacturers[i],'im');
    var match = text.match(mfg);
    if(match)
      return true;
  }
  return false;
};

Flight.prototype.segments_per_trip = 1;
Flight.prototype.trips = 1;

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
  var params = {
    'key': '423120471f5c355512049b4532b2332f',
    'origin_airport': this.origin,
    'destination_airport': this.destination,
    'airline': this.airline,
    'aircraft': this.aircraft,
    'segments_per_trip': this.segments_per_trip,
    'trips': this.trips
  }
  var url = Util.urlFor('http://carbon.brighterplanet.com/flights.json', params);

  Careplane.fetch(url, Flight.events.emissionEstimateSuccess(this, callback));
}

Flight.aircraftManufacturers = ['"AERO DESIGN & ENGINEERING CO, US"','AEROSPATIALE',
'AIRBUS','ANTONOV','AVRO','BAE SYSTEMS','BOEING','BOMBARDIER','BRITISH AEROSPACE',
'CANADAIR','CASA','CESSNA','CONVAIR','CURTISS','DASSAULT','DE HAVILLAND',
'DORNIER','EMBRAER','FOKKER','GRUMMAN','GULFSTREAM AEROSPACE','HARBIN',
'HAWKER BEECHCRAFT CORP','HAWKER SIDDELEY','HELIO','IAI','ILYUSHIN','JETSTREAM',
'LET','LOCKHEED','MCDONNELL DOUGLAS','NAMC','NORD','NORTH AMERICAN ROCKWELL',
'PILATUS','PILATUS BRITTENNORMAN','PIPER','ROCKWELL','SAAB','SHORT','SUDEST',
'SWEARINGEN','TUPOLEV','VOLPAR','VULCANAIR','YAKOVLEV'];



