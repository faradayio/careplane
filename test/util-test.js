var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert;

var Util = helper.plugin.require('./util');

vows.describe('Util').addBatch({
  '.footprintAnalysis': {
    'reports a better-than-average footprint': function() {
      var result = Util.footprintAnalysis(1500,1100);
      assert.match(result, /taking/);
    },
    'reports an average footprint': function() {
      var result = Util.footprintAnalysis(1100,1100);
      assert.match(result, /is an average/);
    },
    'reports a worse-than-average footprint': function() {
      var result = Util.footprintAnalysis(1500,1700);
      assert.match(result, /adding/);
    }
  },

  '.footprintComparison': {
    'reports a better-than-average footprint': function() {
      var result = Util.footprintComparison(1500,1100);
      assert.match(result, /lower/);
    },
    'reports an average footprint': function() {
      var result = Util.footprintComparison(1100,1100);
      assert.match(result, /as average/);
    },
    'reports a worse-than-average footprint': function() {
      var result = Util.footprintComparison(1500,1700);
      assert.match(result, /more/);
    }
  }
});
