describe('Trip', function() {
  var trip, onTripEmissionsComplete, onFlightEmissionsComplete, p;
  beforeEach(function() {
    var parent = document.createElement('div');
    p = document.createElement('p');
    parent.appendChild(p);
    trip = new Trip();
    trip.flights = function() { return [1,2,3]; };
    trip.footprintParagraph = p;
    trip.totalFootprint = 0;
    trip.completedFlightCount = 0;
    onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');
    onFlightEmissionsComplete = trip.onFlightEmissionsComplete(onTripEmissionsComplete);
  });


  describe('#rate', function() {
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
    it('updates the footprint paragraph with the latest total', function() {
      onFlightEmissionsComplete({ emission: 2714.8 }, {});
      expect(p.innerHTML).toMatch(/5,972.6/);
    });
    it('executes the onTripEmissionsComplete function when all flights are ready', function() {
      onFlightEmissionsComplete({ emission: 1 }, {});
      onFlightEmissionsComplete({ emission: 2 }, {});
      onFlightEmissionsComplete({ emission: 3 }, {});
      expect(onTripEmissionsComplete).toHaveBeenCalled();
    });
  });

  describe('#addDetails', function() {
    it('creates a details div if none exists', function() {
      trip.addDetails('hi');
      expect($(trip.footprintParagraph.nextSibling)).toHaveText('hi');
    });
    it('adds details to an existing details div', function() {
      trip.addDetails('hi');
      trip.addDetails(' there');
      expect($(trip.footprintParagraph.nextSibling)).toHaveText('hi there');
    });
  });
});
