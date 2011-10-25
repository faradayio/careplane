var CM1 = require('CM1');
var Util = require('./util');

var Flight = module.exports = function(origin, destination) {
  this.origin = origin;
  this.destination = destination;
};

CM1.extend(Flight, {
  model: 'flight',
  provides: ['airline', 'aircraft', 'segments_per_trip', 'trips', {
    origin_airport: 'origin',
    destination_airport: 'destination'
  }]
});

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

Flight.prototype.sanitizedAircraft = function() {
  return this.aircraft.
    replace(/\s+$/,'').
    replace(/^\s+/,'').
    replace(/[\n\r\t\s]+/g, ' ').
    replace(/&nbsp;/g, '');
};

Flight.aircraftManufacturers = ['"AERO DESIGN & ENGINEERING CO, US"','AEROSPATIALE',
'AIRBUS','ANTONOV','AVRO','BAE SYSTEMS','BOEING','BOMBARDIER','BRITISH AEROSPACE',
'CANADAIR','CASA','CESSNA','CONVAIR','CURTISS','DASSAULT','DE HAVILLAND',
'DORNIER','EMBRAER','FOKKER','GRUMMAN','GULFSTREAM AEROSPACE','HARBIN',
'HAWKER BEECHCRAFT CORP','HAWKER SIDDELEY','HELIO','IAI','ILYUSHIN','JETSTREAM',
'LET','LOCKHEED','MCDONNELL DOUGLAS','NAMC','NORD','NORTH AMERICAN ROCKWELL',
'PILATUS','PILATUS BRITTENNORMAN','PIPER','ROCKWELL','SAAB','SHORT','SUDEST',
'SWEARINGEN','TUPOLEV','VOLPAR','VULCANAIR','YAKOVLEV'];
