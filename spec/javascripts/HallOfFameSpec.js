describe('HallOfFame', function() {
  var trip1, trip2, trip3, trip4, trip5;
  beforeEach(function() {
    controller = new AirTrafficController('abc123');
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
  });

  describe('.induct', function() {
    it('adds a new trip', function() {
      HallOfFame.induct(trip1);
      expect(HallOfFame.trips['22']).toEqual(trip1);
    });
    it('does not add a duplicate trip', function() {
      HallOfFame.induct(trip1);
      HallOfFame.induct(trip1);
      expect(HallOfFame.count).toBe(1);
    });
  });

  describe('.average', function() {
    it('returns the average trip footprint', function() {
      HallOfFame.induct(trip2);
      HallOfFame.induct(trip3);
      HallOfFame.induct(trip4);
      expect(HallOfFame.average()).toBe(300);
    });
    it('returns 0 if there are no trips', function() {
      expect(HallOfFame.average()).toBe(0);
    });
  });

  describe('.updateRatingScale', function() {
    it('sets scale to null when min and max are the same', function() {
      HallOfFame.induct(trip1);

      expect(HallOfFame.scale).toBeNull();
    });
    it('creates a rating scale for each footprint', function() {
      var tripList = [trip1, trip2, trip3, trip4, trip5];
      for(var i in tripList) {
        HallOfFame.induct(tripList[i]);
      }

      expect(HallOfFame.scale[100]).toBe(1);
      expect(HallOfFame.scale[200]).toBe(0.5);
      expect(HallOfFame.scale[300]).toBe(0);
      expect(HallOfFame.scale[400]).toBe(-0.5);
      expect(HallOfFame.scale[500]).toBe(-1);
    });
  });
});
