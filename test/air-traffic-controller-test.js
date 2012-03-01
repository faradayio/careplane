var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;
var AirTrafficController = require('../lib/air-traffic-controller'),
    Trip = require('../lib/trip');

var $ = helper.qweryFixture();
var controller, trip1, trip2, trip3, trip4, trip5, list;
controller = new AirTrafficController($);
controller.init();
trip1 = new Trip(1, $);
trip1.id = '22';
trip1.totalFootprint = 100;
trip1.cost = function() { return 1; };
trip2 = new Trip(2, $);
trip2.id = '33';
trip2.totalFootprint = 200;
trip2.cost = function() { return 2; };
trip3 = new Trip(3, $);
trip3.id = '44';
trip3.totalFootprint = 300;
trip3.cost = function() { return 3; };
trip4 = new Trip(4, $);
trip4.id = '55';
trip4.totalFootprint = 400;
trip4.cost = function() { return 4; };
trip5 = new Trip(5, $);
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

vows.describe('AirTrafficController').addBatch({
  '#rateTrips': {
    'rates each trip on a scale of -1 to 1': function() {
      controller.finishedTrips = function() { return list; };
      for(var i in list) {
        controller.hallOfFame.induct(list[i]);
      }

      controller.rateTrips();
      assert.equal(trip1.rating,1);
      assert.equal(trip2.rating,0.5);
      assert.equal(trip3.rating,0);
      assert.equal(trip4.rating,-0.5);
      assert.equal(trip5.rating,-1);
    },
    'gives an average rating for a single trip': function() {
      controller.finishedTrips = function() { return [trip1]; };
      controller.hallOfFame.clear();
      controller.hallOfFame.induct(trip1);

      controller.rateTrips();
      assert.equal(controller.finishedTrips()[0].rating,0);
    },
    'gives an average rating to all flights if all footprints are equal': function() {
      controller.finishedTrips = function() { return list; };
      for(var i in list) {
        var trip = list[i];
        trip.totalFootprint = 300;
        controller.hallOfFame.induct(trip);
      }

      controller.rateTrips();
      
      for(var i in list)
        assert.equal(list[i].rating,0);
    }
  },

  '#tripIsAlreadyDiscovered': {
    topic: function() {
      helper.inBrowser(this.callback);
    },

    'returns true if a careplane info element exists': function(err, window) {
      var elem = window.document.createElement('div');
      var careplane = window.document.createElement('p');
      careplane.setAttribute('class', 'careplane-info');
      elem.appendChild(careplane);

      assert.isTrue(controller.tripIsAlreadyDiscovered(elem));
    },
    'returns false if no careplane footprint element exists': function(err, window) {
      var elem = window.document.createElement('div');

      assert.isFalse(controller.tripIsAlreadyDiscovered(elem));
    }
  },

  '#minCost': {
    'returns the minimum cost amount': function() {
      controller.trips = list;
      assert.equal(controller.minCost(),1);
    }
  }
}).export(module);
