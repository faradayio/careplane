describe('Orbitz', function() {
  describe('.scoreFlights', function() {
    it('asks the OrbitzScoreKeeper to officiate each result', function() {
      loadFixtures('orbitz_dtw_sfo.html');
      Careplane.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 512.0 }));
      }
      Orbitz.scoreFlights(window.document);

      $('div.result').each(function(i, result) {
        expect($(result)).toContain('p.total-footprint');
        expect($(result).children('p.total-footprint').get(0).innerText).
          toMatch(/[\d,]+\s*kg CO2e/);
      });
    });
    it('works for DFW<->GRU', function() {
      loadFixtures('orbitz_dfw_gru.html');
      Careplane.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 512.0 }));
      }
      Orbitz.scoreFlights(window.document);
      $('div.result').each(function(i, result) {
        expect($(result)).toContain('p.total-footprint');
        expect($(result).children('p.total-footprint').get(0).innerText).
          toMatch(/[\d,]+\s*kg CO2e/);
      });
    });
  });
});

describe('OrbitzScoreKeeper', function() {
  var result, keeper;

  beforeEach(function() {
    loadFixtures('orbitz_dtw_sfo_result.html');
    result = $('.result').get(0);
    keeper = new OrbitzScoreKeeper(result);
  });

  describe('#officiate', function() {
    it('parses each flight and totals emissions', function() {
      Careplane.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 123.0 }));
      }
      keeper.officiate();
      expect($('.result .total-footprint')).toHaveText(/246 kg/);
    });
  });
  describe('#onEmissionsSuccess', function() {
    var onEmissionsSuccess;
    beforeEach(function() {
      var onEmissionsSuccess = keeper.onEmissionsSuccess($('.resultLeg').get(0), keeper);
      onEmissionsSuccess(123.0);
      onEmissionsSuccess = keeper.onEmissionsSuccess($('.resultLeg').get(1), keeper);
      onEmissionsSuccess(123.0);
    });

    it('updates the total emissions result when all emissions are finished', function() {
      expect($('.result .total-footprint')).toHaveText(/246 kg/);
    });

    it('updates the footprint paragraph with the latest total', function() {
      expect($('.result .total-footprint').html()).toMatch(/246/);
    });
    it('sets the p font color to black when finished with all footprints', function() {
      expect($('.result .total-footprint').get(0).style.color).toBe('rgb(0, 0, 0)');
    });
  });
});

describe('OrbitzFlight', function() {
  describe('.parse', function() {
    it('parses an Orbitz leg', function() {
      loadFixtures('orbitz_dtw_sfo_result.html');
      var node = $('.resultLeg').get(0);

      var flight = OrbitzFlight.parse(node);
      expect(flight.origin).toBe('DTW');
      expect(flight.destination).toBe('SFO');
      expect(flight.airline).toBe('Delta Air Lines');
      expect(flight.aircraft).toBe('Boeing 737');
    });
  });
});
