describe('AirTrafficController', function() {
  var controller, trip1, trip2, trip3, trip4, trip5, list;
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
    list = [trip1, trip2, trip3, trip4, trip5];
    for(var i in list) {
      var trip = list[i];
      trip.completedFlightCount = 1;
      trip.footprintView = function() { return {
        init: function() {},
        update: function() {},
        updateRating: function() {}
      } };
      trip.infoView = function() { return {
        init: function() {},
        updateSearchAverage: function() {}
      } };
    }
  });

  describe('#rateTrips', function() {
    it('rates each trip on a scale of -1 to 1', function() {
      controller.finishedTrips = function() { return list; };
      for(var i in list) {
        HallOfFame.induct(list[i]);
      }

      controller.rateTrips();
      expect(trip1.rating).toBe(1);
      expect(trip2.rating).toBe(0.5);
      expect(trip3.rating).toBe(0);
      expect(trip4.rating).toBe(-0.5);
      expect(trip5.rating).toBe(-1);
    });
    it('gives an average rating for a single trip', function() {
      controller.finishedTrips = function() { return [trip1]; };
      HallOfFame.induct(trip1);

      controller.rateTrips();
      expect(controller.finishedTrips()[0].rating).toBe(0);
    });
    it('gives an average rating to all flights if all footprints are equal', function() {
      controller.finishedTrips = function() { return list; };
      for(var i in list) {
        var trip = list[i];
        trip.totalFootprint = 300;
        HallOfFame.induct(trip);
      }

      controller.rateTrips();
      
      for(var i in list)
        expect(list[i].rating).toBe(0);
    });
  });
});
