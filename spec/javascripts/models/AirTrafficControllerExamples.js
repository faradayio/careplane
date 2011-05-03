sharedExamplesFor('AirTrafficController', function() {
  beforeEach(function() {
    TestExtension.urlMap['carbon.brighterplanet.com/flights'] = "{ \"emission\": 234 }"
  });

  it('keeps a list of trips', function() {
    this.controller.scoreTrips();
    expect(this.controller.trips[0]).not.toBeNull();
  });

  describe('#clear', function() {
    it('scores all trips and color codes them', function() {
      this.controller.clear();
      expect(this.controller.tripCount).toBeGreaterThan(0);
      for(var i in this.controller.trips) {
        var p = this.controller.trips[i].footprintView().footprintParagraph();
        expect(p.innerHTML).toMatch(/[\d,]+/);
      }
    });
  });

  describe('#discoverTrips', function() {
    it('creates a list of Trip objects', function() {
      this.controller.discoverTrips();
      expect(this.controller.tripCount).toBeGreaterThan(0);
    });
    it('does not load duplicate trips', function() {
      this.controller.discoverTrips();
      var numTrips = this.controller.tripCount;
      this.controller.discoverTrips();
      expect(this.controller.tripCount).toBe(numTrips);
    });
  });

  describe('#scoreTrips', function() {
    var searchEmissionsComplete;
    beforeEach(function() {
      searchEmissionsComplete = jasmine.createSpy('searchEmissionsComplete');
      this.controller.events.searchEmissionsComplete = searchEmissionsComplete;
      this.controller.discoverTrips();
      this.controller.scoreTrips();
    });

    it('scores each trip', function() {
      expect($('.careplane-footprint')).toHaveText(/[\d,]+/)
    });

    it('reports methodologies for each trip', function() {
      for(var i in this.controller.trips) {
        var div = this.controller.trips[i].infoView().target();
        expect($(div).find('.careplane-methodologies li a').length).toBeGreaterThan(0);
        $(div).find('.careplane-methodologies li a').each(function(i, a) {
          expect($(a)).toHaveText(/[A-Z]{3}-[A-Z]{3}/);
        });
      }
    });

    it('fires the searchEmissionsComplete event when finished', function() {
      expect(searchEmissionsComplete).toHaveBeenCalled();
    });
  });

  describe('#rateTrips', function() {
    it('reports the global average for each trip', function() {
      this.controller.discoverTrips();
      this.controller.scoreTrips();
      this.controller.rateTrips();
      for(var i in this.controller.trips) {
        var div = this.controller.trips[i].infoView().target();
        expect($(div).find('p.careplane-search-average-comparison')).toHaveText(/impact/);
      }
    });
  });
});
