describe('Trip', function() {
  describe('#rate', function() {
    var trip;

    beforeEach(function() {
      trip = new Trip();
      trip.footprintParagraph = window.document.createElement('p');
    });

    it('assigns a rating to the trip <p> element', function() {
      trip.rate(0);
      expect(trip.footprintParagraph.style.color).toBe('rgb(127, 127, 127)');
    });
    it('assigns a "green" rating if rating is positive', function() {
      trip.rate(0.6);
      expect(trip.footprintParagraph.style.color).toBe('rgb(51, 204, 51)');
    });
    it('assigns a "red" rating if rating is negative', function() {
      trip.rate(-0.6);
      expect(trip.footprintParagraph.style.color).toBe('rgb(204, 51, 51)');
    });
  });

  describe('#onFlightEmissionsComplete', function() {
    var trip, onTripEmissionsComplete, onFlightEmissionsComplete, p;

    beforeEach(function() {
      p = document.createElement('p');
      trip = new Trip();
      trip.flights = function() { return [1,2,3]; };
      trip.footprintParagraph = p;
      trip.totalFootprint = 0;
      trip.completedFlightCount = 0;
      onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');
      onFlightEmissionsComplete = trip.onFlightEmissionsComplete(onTripEmissionsComplete);
    });

    it('updates the footprint paragraph with the latest total', function() {
      onFlightEmissionsComplete(2714.8);
      expect(p.innerHTML).toMatch(/5,972.6/);
    });
    it('executes the onTripEmissionsComplete function when all flights are ready', function() {
      onFlightEmissionsComplete(1);
      onFlightEmissionsComplete(2);
      onFlightEmissionsComplete(3);
      expect(onTripEmissionsComplete).toHaveBeenCalled();
    });
  });
});
