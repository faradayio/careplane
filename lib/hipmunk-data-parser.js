var _ = require('underscore');

var HipmunkDataParser = function(tabs, target) {
  this.tabs = tabs;
  this.target = target;
};

HipmunkDataParser.prototype.run = function() {
  var representation = this.buildRepresentation();
  this.writeRepresentation(representation);
};

HipmunkDataParser.prototype.buildRepresentation = function() {
  var representation = {};

  _.each(this.tabs, function(tab, tabName) {
    representation[tabName] = { routings: [] };

    _.each(tab.routings, function(routing) {
      var newRouting = { legs: [] };

      if(routing.$html) {
        newRouting.id = routing.$html[0].id;

        _.each(routing.legs, function(leg) {
          var newLeg = {};

          newLeg.from = leg.from_code;
          newLeg.to = leg.to_code;
          newLeg.airline = leg.operating_num[0] || leg.marketing_num[0];
          newLeg.seatClass = leg.cabin_str;
          newLeg.aircraft = tab.flight_data.equipments[leg.equipment + newLeg.airline];

          newRouting.legs.push(newLeg);
        });

        representation[tabName].routings.push(newRouting);
      }
    });
  });

  return representation;
};

HipmunkDataParser.prototype.writeRepresentation = function(representation) {
  this.target.innerText = JSON.stringify(representation);
};

module.exports = HipmunkDataParser;
