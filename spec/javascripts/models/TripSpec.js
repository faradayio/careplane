describe('Trip', function() {
  describe('.average', function() {
    var trip;
    beforeEach(function() {
      trip = new AverageTrip('ORD', 'SEA', 143.5);
      trip.totalFootprint = 143.5;
      Trip._averages = [trip];
    });

    it('looks up an average trip based on origin and destination', function() {
      spyOn(Careplane,'fetch');
      var avg = Trip.average('ORD','PDX', function() { });
      expect(Careplane.fetch).toHaveBeenCalled();
    });
    it('fetches cached averages', function() {
      spyOn(Careplane,'fetch');
      var avg = Trip.average('ORD','SEA', function() { });
      expect(Careplane.fetch).not.toHaveBeenCalled();
    });
    it('provides the average trip to the callback', function() {
      var result;
      var avg = Trip.average('ORD','SEA', function(average) { result = average; });
      expect(result).toEqual(trip);
    });
  });

  describe('#isAlreadyDiscovered', function() {
    it('returns true if a careplane info element exists', function() {
      var elem = document.createElement('div');
      var careplane = document.createElement('p');
      careplane.setAttribute('class', 'careplane-info');
      elem.appendChild(careplane);

      expect(Trip.isAlreadyDiscovered(elem)).toBeTruthy();
    });
    it('returns false if no careplane footprint element exists', function() {
      var elem = document.createElement('div');

      expect(Trip.isAlreadyDiscovered(elem)).toBeFalsy();
    });
  });
});
