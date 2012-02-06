var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

vows.describe('Util').addBatch({
  var Util = require('../lib/util');

  '.footprintAnalysis': {
    'reports a better-than-average footprint': function() {
      var result = Util.footprintAnalysis(1500,1100);
      expect(result).toMatch(/taking/);
    });
    'reports an average footprint': function() {
      var result = Util.footprintAnalysis(1100,1100);
      expect(result).toMatch(/is an average/);
    });
    'reports a worse-than-average footprint': function() {
      var result = Util.footprintAnalysis(1500,1700);
      expect(result).toMatch(/adding/);
    });
  });

  '.footprintComparison': {
    'reports a better-than-average footprint': function() {
      var result = Util.footprintComparison(1500,1100);
      expect(result).toMatch(/lower/);
    });
    'reports an average footprint': function() {
      var result = Util.footprintComparison(1100,1100);
      expect(result).toMatch(/as average/);
    });
    'reports a worse-than-average footprint': function() {
      var result = Util.footprintComparison(1500,1700);
      expect(result).toMatch(/more/);
    });
  });

});
