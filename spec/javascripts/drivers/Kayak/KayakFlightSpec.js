describe('KayakFlight', function() {
  describe('.parse', function() {
    describe('with a normal flight', function() {
      beforeEach(function() {
        //loadFixtures('kayak_dtw_sfo_direct_flight.html');
      });
      it('parses airline', function() {

      });
      it('parses origin', function() {

      });
      it('parses destination', function() {

      });
    });
    describe('with a redeye flight', function() {
    });
  });
  describe('.parseAircraft', function() {
    it('returns the name of the aircraft', function() {
      loadFixtures('kayak_dtw_sfo_direct_flight.html');
      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var rows = Array.prototype.slice.call(trs);
      var aircraft = KayakFlight.parseAircraft(rows.slice(1, 4));
      expect(aircraft).toMatch('Embraer');
    });
    it('filters out aircraft details', function() {
      loadFixtures('kayak_dtw_sfo_direct_flight.html');
      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var rows = Array.prototype.slice.call(trs);
      var aircraft = KayakFlight.parseAircraft(rows.slice(1, 4));
      rows[1].children[1].innerHTML = "hi|Embraer (Winglets) (Narrow-body)|man";
      expect(aircraft).not.toMatch(/\(/);
    });
    it('returns null if no aircraft found', function() {
      loadFixtures('kayak_dtw_sfo_direct_flight.html');
      var trs = $('.flightdetailstable').get(1).getElementsByTagName('tr');
      var rows = Array.prototype.slice.call(trs);
      var aircraft = KayakFlight.parseAircraft(rows.slice(1, 4));
      rows[1].children[1].innerHTML = "hi|there|man";
      expect(aircraft).toMatch('Embraer');
    });
  });
});
