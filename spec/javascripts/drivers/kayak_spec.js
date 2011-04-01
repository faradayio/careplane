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
});

//describe('KayakAirTrafficController', function() {
  //describe('#scoreTrips', function() {
    //it('parses all flights', function() {
      //// need a way to fake ajax for kayak AND cm1
      //loadFixtures('kayak_dtw_sfo.html');
      //var controller = new KayakAirTrafficController('abc123');
      //controller.scoreTrips();
      //expect($('.careplane-footprint').length).toBeGreaterThan(0);
      //$('.careplane-footprint').each(function(footprintP) {
        //expect($(footprintP)).toHaveText(/.+/)
      //});
    //});
  //});
//});

describe('KayakTrip', function() {
  describe('#isScorable', function() {
    it('returns false if the tripElement has footprint <p>s', function() {
      setFixtures('<div class="flightresult resultrow"><div class="resultbottom" id="fdetails521"><p class="careplane-footprint"></p></div></div>');

      var trip = new KayakTrip($('.flightresult').get(0));
      expect(trip.isScorable()).toBeFalsy();
    });
    it('returns true if the tripElement has no footprint <p>s', function() {
      setFixtures('<div class="flightresult resultrow"><div class="resultbottom" id="fdetails521"></div></div>');

      var trip = new KayakTrip($('.flightresult').get(0));
      expect(trip.isScorable()).toBeTruthy();
    });
  });

  describe('#calculateFootprint', function() {
    beforeEach(function() {
      Careplane.fetch = function(url, callback) {
        callback("{ \"emission\": 1234 }");
      }
    });
    it('parses regular flights', function() {
      loadFixtures('kayak_dtw_sfo_direct_flight.html');
      var controller = new KayakAirTrafficController('abc123');
      controller.scoreTrips();
      expect($('.careplane-footprint')).toHaveText(/.+/)
    });
    it('parses redeye flights', function() {
      loadFixtures('kayak_dtw_sfo_redeye.html');
      var controller = new KayakAirTrafficController('abc123');
      controller.scoreTrips();
      expect($('.careplane-footprint')).toHaveText(/.+/)
    });
  });

  describe('#createFootprintParagraph', function() {
    it('creates a careplane-footprint paragraph', function() {
      setFixtures('<div class="flightresult resultrow"><div class="resultbottom"></div></div>');

      var trip = new KayakTrip($('.flightresult').get(0));
      trip.createFootprintParagraph();
      expect($('.resultbottom')).toContain('p.careplane-footprint');
    });
  });

  describe('#flightIndices', function() {
    it('returns an array of tr indices which represent flights', function() {
      loadFixtures('kayak_dtw_sfo_direct_flight.html');
      var trip = new KayakTrip();

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
      var trip = new KayakTrip();

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

  describe('#updateEmissionEstimate', function() {
    var trip, updateEmissionEstimate, p;

    beforeEach(function() {
      p = document.createElement('p');
      trip = new KayakTrip();
      trip.flights = function() { return [1,2,3]; };
      trip.footprintParagraph = function() { return p; };
      updateEmissionEstimate = trip.updateEmissionEstimate();
    });

    it('updates the footprint paragraph with the latest total', function() {
      updateEmissionEstimate(1234);
      expect(p.innerHTML).toMatch(/2,714.8/);
    });
    it('sets the p font color to black when finished with all footprints', function() {
      updateEmissionEstimate(1);
      updateEmissionEstimate(2);
      updateEmissionEstimate(3);
      expect(p.style.color).toBe('rgb(0, 0, 0)');
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
