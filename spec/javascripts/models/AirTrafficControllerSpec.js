describe('AirTrafficController', function() {
  var controller, trip1, trip2, trip3, trip4, trip5, list;
  beforeEach(function() {
    controller = new AirTrafficController('abc123');
    trip1 = new Trip();
    trip1.totalFootprint = 100;
    trip2 = new Trip();
    trip2.totalFootprint = 200;
    trip3 = new Trip();
    trip3.totalFootprint = 300;
    trip4 = new Trip();
    trip4.totalFootprint = 400;
    trip5 = new Trip();
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

  describe('#averageFootprint', function() {
    it('returns the average trip footprint', function() {
      trip1.totalFootprint = 300;
      trip2.totalFootprint = 200;
      trip3.totalFootprint = 400;
      controller.finishedTrips = function() { return [trip1, trip2, trip3]; };
      expect(controller.averageFootprint()).toBe(300);
    });
    it('returns 0 if there are no trips', function() {
      controller.finishedTrips = function() { return []; };
      expect(controller.averageFootprint()).toBe(0);
    });
  });

  describe('#rateTrips', function() {
    it('rates each trip on a scale of -1 to 1', function() {
      controller.finishedTrips = function() { return [trip1, trip2, trip3, trip4, trip5]; };
      controller.rateTrips();
      expect(trip1.rating).toBe(1);
      expect(trip2.rating).toBe(0.5);
      expect(trip3.rating).toBe(0);
      expect(trip4.rating).toBe(-0.5);
      expect(trip5.rating).toBe(-1);
    });
    it('gives an average rating for a single trip', function() {
      controller.finishedTrips = function() { return [trip1]; };
      controller.rateTrips();
      expect(controller.finishedTrips()[0].rating).toBe(0);
    });
    it('gives an average rating to all flights if all footprints are equal', function() {
      controller.finishedTrips = function() { return [trip1, trip2, trip3, trip4, trip5]; };
      for(i = 0; i < 5; i++)
        controller.finishedTrips()[i].totalFootprint = 300;

      controller.rateTrips();
      
      for(i = 0; i < 5; i++)
        expect(controller.finishedTrips()[i].rating).toBe(0);
    });
  });

  describe('#ratingScale', function() {
    it('returns null when min and max are the same', function() {
      controller.finishedTrips = function() { return [trip1]; };
      var scale = controller.ratingScale();
      expect(scale).toBeNull();
    });
    it('creates a rating scale for each footprint', function() {
      controller.finishedTrips = function() { return [trip1, trip2, trip3, trip4, trip5]; };
      var scale = controller.ratingScale();
      expect(scale[100]).toBe(1);
      expect(scale[200]).toBe(0.5);
      expect(scale[300]).toBe(0);
      expect(scale[400]).toBe(-0.5);
      expect(scale[500]).toBe(-1);
    });
  });
});
