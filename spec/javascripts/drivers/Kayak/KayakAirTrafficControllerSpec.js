describe('KayakAirTrafficController', function() {
  var controller;
  beforeEach(function() {

    controller = new KayakAirTrafficController(document);
  });

  it('keeps a list of trips', function() {
    Util.fetch = function(url, callback) {
      callback("{ \"emission\": 1234 }");
    }
    loadFixtures('kayak_dtw_sfo_direct_flight.html');
    controller.scoreTrips();
    expect(controller.trips[0]).not.toBeNull();
  });

  describe('#clear', function() {
    it('scores all trips and color codes them', function() {
      Util.fetch = function(url, callback) {
        callback("{ \"emission\": 123 }");
      }
      loadFixtures('kayak_dtw_sfo.html');
      controller.clear()();
      expect(controller.trips.length).toBe(15);
      for(var i in controller.trips) {
        expect(controller.trips[i].footprintParagraph.innerHTML).toMatch(/[\d]+/);
        expect(controller.trips[i].footprintParagraph.style.color).toMatch(/rgb/);
      }
    });
    it('scores one-way trips', function() {
      Util.fetch = function(url, callback) {
        callback("{ \"emission\": 123 }");
      }
      loadFixtures('kayak_dtw_sfo.html');
      controller.clear()();
      expect(controller.trips.length).toBe(15);
      for(var i in controller.trips) {
        expect(controller.trips[i].footprintParagraph.innerHTML).toMatch(/[\d]+/);
        expect(controller.trips[i].footprintParagraph.style.color).toMatch(/rgb/);
      }
    });
  });

  describe('#scoreTrips', function() {
    var onTripEmissionsComplete;
    beforeEach(function() {
      Util.fetch = function(url, callback) {
        callback("{ \"emission\": 1234 }");
      }
      onTripEmissionsComplete = jasmine.createSpy('onTripEmissionsComplete');
      var searchIdentifier = jasmine.createSpy('KayakTrip', 'searchIdentifier');
    });
    it('parses regular flights', function() {
      loadFixtures('kayak_dtw_sfo_direct_flight.html');
      controller.scoreTrips(onTripEmissionsComplete);
      expect($('.careplane-footprint')).toHaveText(/.+/)
    });
    it('parses redeye flights', function() {
      loadFixtures('kayak_dtw_sfo_redeye.html');
      controller.scoreTrips(onTripEmissionsComplete);
      expect($('.careplane-footprint')).toHaveText(/.+/)
    });
  });
});
