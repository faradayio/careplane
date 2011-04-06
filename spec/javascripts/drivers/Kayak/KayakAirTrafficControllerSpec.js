describe('KayakAirTrafficController', function() {
  it('keeps a list of trips', function() {
    Careplane.fetch = function(url, callback) {
      callback("{ \"emission\": 1234 }");
    }
    loadFixtures('kayak_dtw_sfo_direct_flight.html');
    var controller = new KayakAirTrafficController();
    controller.scoreTrips();
    expect(controller.trips[0]).not.toBeNull();
  });

  describe('#clear', function() {
    it('scores all trips and color codes them', function() {
      Careplane.fetch = function(url, callback) {
        callback("{ \"emission\": 123 }");
      }
      loadFixtures('kayak_dtw_sfo.html');
      var controller = new KayakAirTrafficController();
      controller.clear()();
      expect(controller.trips.length).toBe(15);
      for(var i in controller.trips) {
        expect(controller.trips[i].footprintParagraph.innerHTML).toMatch(/[\d]+/);
        expect(controller.trips[i].footprintParagraph.style.color).toMatch(/rgb/);
      }
    });
    it('scores one-way trips', function() {
      Careplane.fetch = function(url, callback) {
        callback("{ \"emission\": 123 }");
      }
      loadFixtures('kayak_dtw_sfo.html');
      var controller = new KayakAirTrafficController();
      controller.clear()();
      expect(controller.trips.length).toBe(15);
      for(var i in controller.trips) {
        expect(controller.trips[i].footprintParagraph.innerHTML).toMatch(/[\d]+/);
        expect(controller.trips[i].footprintParagraph.style.color).toMatch(/rgb/);
      }
    });
  });
});
