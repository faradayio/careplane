describe('AirTrafficController', function() {
  var controller, trip1, trip2, trip3, trip4, trip5;
  beforeEach(function() {
    controller = new AirTrafficController('abc123');
    var tripElement = document.createElement('div');
    var resultBottom = document.createElement('div');
    resultBottom.setAttribute('class', 'resultbottom');
    tripElement.appendChild(resultBottom);
    trip1 = new Trip(tripElement);
    trip1.footprintParagraph = document.createElement('p');
    trip1.totalFootprint = 100;
    trip1.completedFlightCount = 1;
    trip2 = new Trip(tripElement);
    trip2.footprintParagraph = document.createElement('p');
    trip2.totalFootprint = 200;
    trip2.completedFlightCount = 1;
    trip3 = new Trip(tripElement);
    trip3.footprintParagraph = document.createElement('p');
    trip3.totalFootprint = 300;
    trip3.completedFlightCount = 1;
    trip4 = new Trip(tripElement);
    trip4.footprintParagraph = document.createElement('p');
    trip4.totalFootprint = 400;
    trip4.completedFlightCount = 1;
    trip5 = new Trip(tripElement);
    trip5.footprintParagraph = document.createElement('p');
    trip5.totalFootprint = 500;
    trip5.completedFlightCount = 1;
  });

  describe('#averageFootprint', function() {
    it('returns the average trip footprint', function() {
      var trip1 = new Trip();
      trip1.totalFootprint = 300;
      var trip2 = new Trip();
      trip2.totalFootprint = 200;
      var trip3 = new Trip();
      trip3.totalFootprint = 400;
      controller.trips = [trip1, trip2, trip3]
      expect(controller.averageFootprint()).toBe(300);
    });
    it('returns 0 if there are no trips', function() {
      controller.trips = [];
      expect(controller.averageFootprint()).toBe(0);
    });
  });

  describe('#rateTrips', function() {
    it('rates each trip on a scale of -1 to 1', function() {
      controller.trips = [trip1, trip2, trip3, trip4, trip5];
      controller.rateTrips();
      expect(trip1.rating).toBe(1);
      expect(trip2.rating).toBe(0.5);
      expect(trip3.rating).toBe(0);
      expect(trip4.rating).toBe(-0.5);
      expect(trip5.rating).toBe(-1);
    });
    it('gives an average rating for a single trip', function() {
      controller.trips = [trip1];
      controller.rateTrips();
      expect(controller.trips[0].rating).toBe(0);
    });
    it('gives an average rating to all flights if all footprints are equal', function() {
      controller.trips = [trip1, trip2, trip3, trip4, trip5];
      for(i = 0; i < 5; i++)
        controller.trips[i].totalFootprint = 300;

      controller.rateTrips();
      
      for(i = 0; i < 5; i++)
        expect(controller.trips[i].rating).toBe(0);
    });
  });

  describe('#ratingScale', function() {
    it('returns null when min and max are the same', function() {
      controller.trips = [trip1];
      var scale = controller.ratingScale();
      expect(scale).toBeNull();
    });
    it('creates a rating scale for each footprint', function() {
      controller.trips = [trip1, trip2, trip3, trip4, trip5];
      var scale = controller.ratingScale();
      expect(scale[100]).toBe(1);
      expect(scale[200]).toBe(0.5);
      expect(scale[300]).toBe(0);
      expect(scale[400]).toBe(-0.5);
      expect(scale[500]).toBe(-1);
    });
  });
});
