describe('Orbitz', function() {
  describe('#startAirTrafficControl', function() {
    var orbitz;
    beforeEach(function() {
      var extension = new Careplane(window.document);
      extension.doc = window.document;
      orbitz = new Orbitz(extension);
    });

    it('asks the OrbitzTrip to score each result', function() {
      loadFixtures('orbitz_dtw_sfo.html');
      Util.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 512.0 }));
      };
      orbitz.startAirTrafficControl();

      $('div.result').each(function(i, result) {
        expect($(result)).toContain('p.careplane-footprint');
        var p = $(result).children('p.careplane-footprint').get(0);
        expect(p.innerText).toMatch(/[\d]+/);
      });
    });
    it('works for DFW<->GRU', function() {
      loadFixtures('orbitz_dfw_gru.html');
      Util.fetch = function(url, callback) {
        callback(JSON.stringify({ emission: 512.0 }));
      }
      orbitz.startAirTrafficControl();
      $('div.result').each(function(i, result) {
        expect($(result)).toContain('p.careplane-footprint');
        expect($(result).children('p.careplane-footprint').get(0).innerText).
          toMatch(/[\d,]+\s*lbs CO2e/);
      });
    });
  });
});
