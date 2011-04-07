describe('OrbitzTrip', function() {
  var result, trip;

  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo_result.html');
    result = $('.result').get(0);
    trip = new OrbitzTrip(document, result);
  });

  describe('#score', function() {
    it('parses each flight and totals emissions', function() {
      Careplane.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 123.0 }));
      }
      var onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');
      trip.score(onTripEmissionsComplete);
      expect($('.result .total-footprint')).toHaveText(/541.2 lbs/);
    });
  });
  describe('#onFlightEmissionsComplete', function() {
    var onEmissionsComplete, onTripEmissionsComplete;
    beforeEach(function() {
      var onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');
      var onFlightEmissionsComplete = trip.onFlightEmissionsComplete(onTripEmissionsComplete);
      onFlightEmissionsComplete({ emission: 123.0 }, {});
      onFlightEmissionsComplete = trip.onFlightEmissionsComplete(onTripEmissionsComplete);
      onFlightEmissionsComplete({ emission: 123.0 }, {});
    });

    it('updates the total emissions result when all emissions are finished', function() {
      expect($('.result .total-footprint')).toHaveText(/541.2 lbs/);
    });

    it('updates the footprint paragraph with the latest total', function() {
      expect($('.result .total-footprint').html()).toMatch(/541.2/);
    });
    it('sets the p font color to black when finished with all footprints', function() {
      expect($('.result .total-footprint').get(0).style.color).toBe('rgb(0, 0, 0)');
    });
  });
});
