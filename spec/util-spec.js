describe('Util', function() {
  var Util = require('util');

  describe('.footprintAnalysis', function() {
    it('reports a better-than-average footprint', function() {
      var result = Util.footprintAnalysis(1500,1100);
      expect(result).toMatch(/taking/);
    });
    it('reports an average footprint', function() {
      var result = Util.footprintAnalysis(1100,1100);
      expect(result).toMatch(/is an average/);
    });
    it('reports a worse-than-average footprint', function() {
      var result = Util.footprintAnalysis(1500,1700);
      expect(result).toMatch(/adding/);
    });
  });

  describe('.footprintComparison', function() {
    it('reports a better-than-average footprint', function() {
      var result = Util.footprintComparison(1500,1100);
      expect(result).toMatch(/lower/);
    });
    it('reports an average footprint', function() {
      var result = Util.footprintComparison(1100,1100);
      expect(result).toMatch(/as average/);
    });
    it('reports a worse-than-average footprint', function() {
      var result = Util.footprintComparison(1500,1700);
      expect(result).toMatch(/more/);
    });
  });

});
