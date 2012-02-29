var helper = require('../helper'),
    assert = helper.assert,
    vows = helper.vows;

var Kayak = helper.plugin.require('./drivers/kayak'),
    Careplane = helper.plugin.require('./careplane');

var driverExamples = require('../driver-examples');

vows.describe('Kayak').addBatch(
  driverExamples(Kayak, 'kayak_dtw_sfo.html')
).addBatch({
  'has a .driverName': function() {
    assert.equal(Kayak.driverName, 'Kayak');
  },

  '.insertAttribution': {
    topic: function() {
      helper.qweryFixture('kayak_dtw_sfo.html', this.callback);
    },

    'inserts a badge in the top area': function(err, $) {
      var kayak = new Kayak($);
      kayak.insertAttribution();
      assert.equal($('div#rightads .punchline').text(), 'Brighter Planet');
    },
    'inserts a text attribution in the footer': function(err, $) {
      var kayak = new Kayak($);
      kayak.insertAttribution();
      assert.equal($('span.careplane-attribution-footer').text(), ' · Emission estimates powered by Brighter Planet');
    }
  }
}).export(module);
