sharedExamplesFor('AirTrafficController', function() {
  beforeEach(function() {
    Util.fetch = function(url, callback) {
      callback("{ \"emission\": 234 }");
    }
  });

  it('keeps a list of trips', function() {
    this.controller.scoreTrips();
    expect(this.controller.trips[0]).not.toBeNull();
  });

  describe('#clear', function() {
    it('scores all trips and color codes them', function() {
      this.controller.clear();
      expect(this.controller.trips.length).toBeGreaterThan(0);
      for(var i in this.controller.trips) {
        var p = this.controller.trips[i].footprintView().footprintParagraph;
        expect(p.innerHTML).toMatch(/[\d,]+/);
        expect(p.style.color).toMatch(/rgb/);
      }
    });
  });

  describe('#rateTrips', function() {
    it('reports the global average for each trip', function() {
      this.controller.rateTrips();
      for(var i in this.controller.trips) {
        var div = this.controller.trips[i].infoView().div();
        expect($(div).find('span.careplane-average')).toHaveText(/[\d,]+/);
      }
    });
    it('reports methodologies for each trip', function() {
      this.controller.rateTrips();
      for(var i in this.controller.trips) {
        var div = this.controller.trips[i].infoView().div();
        expect($(div).find('ul.careplane-methodologies li a').length).toBeGreaterThan(0);
        $(div).find('ul.careplane-methodologies li a').each(function(a) {
          expect($(a)).toHaveText(/[A-Z]{3}-[A-Z]{3}/);
        });
      }
    });
  });

  describe('#scoreTrips', function() {
    it('parses and scores trips', function() {
      this.controller.scoreTrips();
      expect($('.careplane-footprint')).toHaveText(/[\d,]+/)
    });
  });
});
