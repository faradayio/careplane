if((typeof chrome == 'undefined' || !chrome.extension) &&
   (typeof safari == 'undefined' || !safari.extension)) {
  (function() {
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

      this.tabs.forEach(function(tab, tabName) {
        representation[tabName] = { routings: [] };

        tab.flight_data.routings.forEach(function(trip) {
          trip.forEach(function(routing) {
            if(routing.$html) {
              var newRouting = {
                id: routing.$html[0].id,
                legs: []
              };

              routing.legs.forEach(function(leg) {
                var newLeg = {};

                newLeg.from = leg.from_code;
                newLeg.to = leg.to_code;
                newLeg.airline = leg.operating_num[0];
                newLeg.routeNumber = leg.operating_num[1];
                newLeg.seatClass = leg.cabin_str;
                newLeg.duration = leg.arrive_sec - leg.depart_sec;
                newLeg.aircraft = tab.flight_data.equipments[leg.equipment + newLeg.airline][0];

                newRouting.legs.push(newLeg);
              });

              representation[tabName].routings.push(newRouting);
            }
          });
        });
      });

      return representation;
    };

    HipmunkDataParser.prototype.writeRepresentation = function(representation) {
      this.target.innerText = JSON.stringify(representation);
    };

    var dataStore = document.createElement('div');
    dataStore.setAttribute('id', 'pilfered-hipmunk-data');
    dataStore.setAttribute('style', 'display: none;');
    document.body.appendChild(dataStore);

    var careplaneInterval = setInterval(function() {
      if($ && $.hipmunk) {
        var tabs = [];
        for(var i in $.hipmunk) {
          var tab = $.hipmunk[i];
          if(tab.flight_data) {
            tabs.push(tab);
          }
        }

        var parser = new HipmunkDataParser(tabs, dataStore);
        parser.run();
      }
    }, 500);
  })();
}
