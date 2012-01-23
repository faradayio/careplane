require('./helper');

vows.describe('AirTrafficController').addBatch({
  var AirTrafficController = require('air-traffic-controller');
  var Trip = require('trip');

  var controller, trip1, trip2, trip3, trip4, trip5, list;
  beforeEach(function() {
    driver = {};
    controller = new AirTrafficController(driver, 'abc123');
    controller.init();
    trip1 = new Trip();
    trip1.id = '22';
    trip1.totalFootprint = 100;
    trip1.cost = function() { return 1; };
    trip2 = new Trip();
    trip2.id = '33';
    trip2.totalFootprint = 200;
    trip2.cost = function() { return 2; };
    trip3 = new Trip();
    trip3.id = '44';
    trip3.totalFootprint = 300;
    trip3.cost = function() { return 3; };
    trip4 = new Trip();
    trip4.id = '55';
    trip4.totalFootprint = 400;
    trip4.cost = function() { return 4; };
    trip5 = new Trip();
    trip5.id = '66';
    trip5.totalFootprint = 500;
    trip5.cost = function() { return 5; };
    list = [trip1, trip2, trip3, trip4, trip5];
    for(var i in list) {
      var trip = list[i];
      trip.completedFlightCount = 1;
      trip.footprintView = {
        init: function() {},
        update: function() {},
        updateRating: function() {}
      };
      trip.infoView = {
        init: function() {},
        updateSearchAverage: function() {},
        updateTripAverage: function() {},
        updateTripTotal: function() {}
      };
    }
  });

  '#rateTrips': {
    'rates each trip on a scale of -1 to 1': function() {
      controller.finishedTrips = function() { return list; };
      for(var i in list) {
        controller.hallOfFame.induct(list[i]);
      }

      controller.rateTrips();
      expect(trip1.rating).toBe(1);
      expect(trip2.rating).toBe(0.5);
      expect(trip3.rating).toBe(0);
      expect(trip4.rating).toBe(-0.5);
      expect(trip5.rating).toBe(-1);
    });
    'gives an average rating for a single trip': function() {
      controller.finishedTrips = function() { return [trip1]; };
      controller.hallOfFame.induct(trip1);

      controller.rateTrips();
      expect(controller.finishedTrips()[0].rating).toBe(0);
    });
    'gives an average rating to all flights if all footprints are equal': function() {
      controller.finishedTrips = function() { return list; };
      for(var i in list) {
        var trip = list[i];
        trip.totalFootprint = 300;
        controller.hallOfFame.induct(trip);
      }

      controller.rateTrips();
      
      for(var i in list)
        expect(list[i].rating).toBe(0);
    });
  });

  '#tripIsAlreadyDiscovered': {
    'returns true if a careplane info element exists': function() {
      var elem = document.createElement('div');
      var careplane = document.createElement('p');
      careplane.setAttribute('class', 'careplane-info');
      elem.appendChild(careplane);

      expect(controller.tripIsAlreadyDiscovered(elem)).toBeTruthy();
    });
    'returns false if no careplane footprint element exists': function() {
      var elem = document.createElement('div');

      expect(controller.tripIsAlreadyDiscovered(elem)).toBeFalsy();
    });
  });

  '#minCost': {
    'returns the minimum cost amount': function() {
      controller.trips = list;
      expect(controller.minCost()).toBe(1);
    });
  });
});
