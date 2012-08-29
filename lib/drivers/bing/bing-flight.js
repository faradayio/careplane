var _ = require('underscore'),
    jsonpath = require('dkastner-JSONPath');

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

  _.each(stages, function(stage) {
    if(stage.ref) {
      stage = jsonpath.eval(searchData[0], '$..stages[?(@.id=="' + stage.ref + '")]')[0];
    }

    _.each(stage.legs, function(leg) {
      if(leg.ref) {
        leg = jsonpath.eval(searchData[0], '$..legs[?(@.id=="' + leg.ref + '")]')[0];
      }
      flights.push(new BingFlight(leg.orig, leg.dest, leg.carrier));
    });
  });

  return flights;
};

module.exports = BingFlight;
