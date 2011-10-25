var jsonpath = require('dkastner-JSONPath');
var Flight = require('../../flight');

var BingFlight = function(origin, destination, airline) {
  this.origin = origin;
  this.destination = destination;
  this.airline = airline;
};
BingFlight.prototype = new Flight();

BingFlight.parse = function(searchData, pricingSignature) {
  var flights = [];
  var stages = jsonpath.eval(searchData[0], '$.quotes[?(@.pricing.signature=="' + pricingSignature + '")].journey.stages[*]');

  for(var i = 0; i < stages.length; i++) {
    var stage = stages[i];

    if(stage.ref) {
      stage = jsonpath.eval(searchData[0], '$..stages[?(@.id==' + stage.ref + ')]')[0];
    }

    for(var j = 0; j < stage.legs.length; j++) {
      var leg = stage.legs[j];
      if(leg.ref) {
        leg = jsonpath.eval(searchData[0], '$..legs[?(@.id=="' + leg.ref + '")]')[0];
      }
      flights.push(new BingFlight(leg.orig, leg.dest, leg.carrier));
    }
  }

  return flights;
};

module.exports = BingFlight;
