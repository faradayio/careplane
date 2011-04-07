describe('KayakTrip', function() {
  describe('#isScorable', function() {
    it('returns false if the tripElement has footprint <p>s', function() {
      setFixtures('<div class="flightresult resultrow"><div class="resultbottom" id="fdetails521"><p class="careplane-footprint"></p></div></div>');

      var trip = new KayakTrip(document, $('.flightresult').get(0));
      expect(trip.isScorable()).toBeFalsy();
    });
    it('returns true if the tripElement has no footprint <p>s', function() {
      setFixtures('<div class="flightresult resultrow"><div class="resultbottom" id="fdetails521"></div></div>');

      var trip = new KayakTrip(document, $('.flightresult').get(0));
      expect(trip.isScorable()).toBeTruthy();
    });
  });

  describe('#createFootprintParagraph', function() {
    it('creates a careplane-footprint paragraph', function() {
      setFixtures('<div class="flightresult resultrow"><div class="resultbottom"></div></div>');

      var trip = new KayakTrip(document, $('.flightresult').get(0));
      trip.createFootprintParagraph();
      expect($('.resultbottom')).toContain('p.careplane-footprint');
    });
  });

  describe('#flightIndices', function() {
    it('returns an array of tr indices which represent flights', function() {
      loadFixtures('kayak_dtw_sfo_direct_flight.html');
      var trip = new KayakTrip(document);

      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var indices = trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');

      trs = $('.flightdetailstable').get(2).getElementsByTagName('tr');
      indices = trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');
    });
    it('gracefully handles redeyes', function() {
      loadFixtures('kayak_dtw_sfo_redeye.html');
      var trip = new KayakTrip(document);

      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var indices = trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');

      trs = $('.flightdetailstable').get(2).getElementsByTagName('tr');
      indices = trip.flightIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('2');
      expect(indices[1]).toBe('5');
    });
  });
});
