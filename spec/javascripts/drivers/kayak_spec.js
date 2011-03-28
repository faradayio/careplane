describe('Kayak', function() {
  //describe('.insertAttribution', function() {
    //beforeEach(function() {
      //loadFixtures('kayak_dtw_sfo.html');
      //Kayak.insertAttribution();
    //});
    //it('inserts a badge in the top area', function() {
      //expect($('div#rightads')).toContain('script[src$="badge.js"]');
    //});
    //it('inserts a text attribution in the footer', function() {
      //expect($('span#careplane-attribution')).toHaveText(' · Emission estimates powered by Brighter Planet');
    //});
  //});
  //describe('.scoreFlights', function() {
  //  it('sets a score for each flight', function() {
  //    loadFixtures('kayak_dtw_sfo.html');
  //    // TODO
  //    // Kayak.scoreFlights(document);
  //  });
  //});
  describe('.handleFlightDetails', function() {
    beforeEach(function() {
      Careplane.fetch = function(url, callback) {
        callback("{ \"emission\": 1234 }");
      }
    });

    it('parses regular flights', function() {
      loadFixtures('kayak_dtw_sfo_direct_segment.html');
      var flightDetails = $('#fdetails13 div:first').html();
      Kayak.handleFlightDetails(flightDetails, 13)
      expect($('p#flight-footprint-13')).toHaveText(/.+/)
    });
    it('parses redeye flights', function() {
      loadFixtures('kayak_dtw_sfo_redeye.html');
      var flightDetails = $('#fdetails0 div:first').html();
      Kayak.handleFlightDetails(flightDetails, 0)
      expect($('p#flight-footprint-0')).toHaveText(/.+/)
    });
  });

  describe('.segmentIndices', function() {
    it('returns an array of tr indices which represent flights', function() {
      loadFixtures('kayak_dtw_sfo_direct_segment.html');

      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var indices = Kayak.segmentIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');

      trs = $('.flightdetailstable').get(2).getElementsByTagName('tr');
      indices = Kayak.segmentIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');
    });
    it('gracefully handles redeyes', function() {
      loadFixtures('kayak_dtw_sfo_redeye.html');

      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var indices = Kayak.segmentIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('1');
      expect(indices[1]).toBe('4');

      trs = $('.flightdetailstable').get(2).getElementsByTagName('tr');
      indices = Kayak.segmentIndices(Array.prototype.slice.call(trs));
      expect(indices.length).toBe(2);
      expect(indices[0]).toBe('2');
      expect(indices[1]).toBe('5');
    });
  });
});

describe('KayakFlight', function() {
  describe('.parse', function() {
    describe('with a normal flight', function() {
      beforeEach(function() {

      });
      it('parses airline', function() {

      });
      it('parses origin', function() {

      });
      it('parses destination', function() {

      });
      it('parses aircraft', function() {

      });
    });
    describe('with a redeye flight', function() {
    });
  });
});
