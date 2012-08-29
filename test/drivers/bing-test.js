var helper = require('../helper'),
    assert = helper.assert,
    vows = helper.vows;

var Bing = helper.plugin.require('./drivers/bing'),
    Careplane = helper.plugin.require('./careplane');

var driverExamples = require('../driver-examples');

vows.describe('Bing').addBatch(
  driverExamples(Bing, 'bing_dtw_sfo.html')
).addBatch({
  'has a .driverName': function() {
    assert.equal(Bing.driverName, 'Bing');
  },

  '.insertAttribution': {
    topic: function() {
      helper.qweryFixture('bing_dtw_sfo.html', this.callback);
    },

    'inserts a badge in the top area': function(err, $, window) {
      var bing = new Bing({ '$': $ });
      bing.insertAttribution();
      assert.equal($('div#bookingAssistant .punchline').text(), 'Brighter Planet');
    },
    'inserts a text attribution in the footer': function(err, $, window) {
      var bing = new Bing({ '$': $ });
      assert.equal($('span.careplane-attribution-footer').text(),'Emission estimates powered by Brighter Planet');
    }
  }
}).export(module);
