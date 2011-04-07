describe('Orbitz', function() {
  describe('.scoreFlights', function() {
    var orbitz;
    beforeEach(function() {
      orbitz = new Orbitz(document);
    });

    it('asks the OrbitzTrip to score each result', function() {
      loadFixtures('orbitz_dtw_sfo.html');
      Careplane.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 512.0 }));
      }
      orbitz.scoreFlights(window.document);

      $('div.result').each(function(i, result) {
        expect($(result)).toContain('p.total-footprint');
        var p = $(result).children('p.total-footprint').get(0);
        expect(p.innerText).toMatch(/[\d]+/);
        expect(p.style.color).toMatch(/rgb\(\d+, \d+, \d+\)/);
      });
    });
    it('works for DFW<->GRU', function() {
      loadFixtures('orbitz_dfw_gru.html');
      Careplane.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 512.0 }));
      }
      orbitz.scoreFlights(window.document);
      $('div.result').each(function(i, result) {
        expect($(result)).toContain('p.total-footprint');
        expect($(result).children('p.total-footprint').get(0).innerText).
          toMatch(/[\d,]+\s*lbs CO2e/);
      });
    });
  });
});
