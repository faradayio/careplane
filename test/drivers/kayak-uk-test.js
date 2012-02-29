var helper = require('../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var KayakUK = helper.plugin.require('./drivers/kayak-uk');

var driverExamples = require('../driver-examples');

vows.describe('KayakUk').addBatch(
  driverExamples(KayakUK, 'kayak_dtw_sfo.html')
).addBatch({
  'has a .driverName': function() {
    assert.equal(KayakUK.driverName, 'KayakUK');
  },

  '.insertAttribution': {
    topic: function() {
      var $ = qweryFixture('kayak_dtw_sfo.html');
      return new KayakUK($);
    },
    'inserts a badge in the top area': function() {
      kayak.insertAttribution();
      assert.equal($('div#rightads .punchline').text(), 'Brighter Planet');
    },
    'inserts a text attribution in the footer': function() {
      kayak.insertAttribution();
      assert.equal($('span.careplane-attribution-footer').text(), ' · Emission estimates powered by Brighter Planet');
    }
  }
}).export(module);
