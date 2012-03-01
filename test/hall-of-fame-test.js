var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon,
    plugin = helper.plugin;

var HallOfFame = plugin.require('./hall-of-fame'),
    Trip = plugin.require('./trip');

var trip1, trip2, trip3, trip4, trip5, hallOfFame;
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

vows.describe('HallOfFame').addBatch({
  '.induct': {
    topic: function() { return new HallOfFame(); },

    'adds a new trip': function(hallOfFame) {
      hallOfFame.induct(trip1);
      assert.equal(hallOfFame.trips['22'], trip1);
    },
    'does not add a duplicate trip': function(hallOfFame) {
      hallOfFame.induct(trip1);
      hallOfFame.induct(trip1);
      assert.equal(hallOfFame.count, 1);
    }
  },

  '.average': {
    topic: function() { return new HallOfFame(); },

    'returns 0 if there are no trips': function(hallOfFame) {
      assert.equal(hallOfFame.average(), 0);
    },
    'returns the average trip footprint': function(hallOfFame) {
      hallOfFame.induct(trip2);
      hallOfFame.induct(trip3);
      hallOfFame.induct(trip4);
      assert.equal(hallOfFame.average(), 300);
    }
  },

  '.updateRatingScale': {
    topic: function() { return new HallOfFame(); },

    'sets scale to null when min and max are the same': function(hallOfFame) {
      hallOfFame.induct(trip1);

      assert.isNull(hallOfFame.scale);
    },
    'creates a rating scale for each footprint': function(hallOfFame) {
      var tripList = [trip1, trip2, trip3, trip4, trip5];
      for(var i in tripList) {
        hallOfFame.induct(tripList[i]);
      }

      assert.equal(hallOfFame.scale[100], 1);
      assert.equal(hallOfFame.scale[200], 0.5);
      assert.equal(hallOfFame.scale[300], 0);
      assert.equal(hallOfFame.scale[400], -0.5);
      assert.equal(hallOfFame.scale[500], -1);
    }
  }
}).export(module);
