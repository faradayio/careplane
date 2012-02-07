var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

vows.describe('HallOfFame').addBatch({
  var HallOfFame = require('hall-of-fame');
  var Trip = require('trip');

  var trip1, trip2, trip3, trip4, trip5, hallOfFame;
  beforeEach(function() {
    trip1 = new Trip();
    trip1.id = '22';
    trip1.totalFootprint = 100;
    trip2 = new Trip();
    trip2.id = '33';
    trip2.totalFootprint = 200;
    trip3 = new Trip();
    trip3.id = '44';
    trip3.totalFootprint = 300;
    trip4 = new Trip();
    trip4.id = '55';
    trip4.totalFootprint = 400;
    trip5 = new Trip();
    trip5.id = '66';
    trip5.totalFootprint = 500;

    hallOfFame = new HallOfFame();
  });

  '.induct': {
    'adds a new trip': function() {
      hallOfFame.induct(trip1);
      expect(hallOfFame.trips['22']).toEqual(trip1);
    });
    'does not add a duplicate trip': function() {
      hallOfFame.induct(trip1);
      hallOfFame.induct(trip1);
      expect(hallOfFame.count).toBe(1);
    });
  });

  '.average': {
    'returns the average trip footprint': function() {
      hallOfFame.induct(trip2);
      hallOfFame.induct(trip3);
      hallOfFame.induct(trip4);
      expect(hallOfFame.average()).toBe(300);
    });
    'returns 0 if there are no trips': function() {
      expect(hallOfFame.average()).toBe(0);
    });
  });

  '.updateRatingScale': {
    'sets scale to null when min and max are the same': function() {
      hallOfFame.induct(trip1);

      expect(hallOfFame.scale).toBeNull();
    });
    'creates a rating scale for each footprint': function() {
      var tripList = [trip1, trip2, trip3, trip4, trip5];
      for(var i in tripList) {
        hallOfFame.induct(tripList[i]);
      }

      expect(hallOfFame.scale[100]).toBe(1);
      expect(hallOfFame.scale[200]).toBe(0.5);
      expect(hallOfFame.scale[300]).toBe(0);
      expect(hallOfFame.scale[400]).toBe(-0.5);
      expect(hallOfFame.scale[500]).toBe(-1);
    });
  });
});
