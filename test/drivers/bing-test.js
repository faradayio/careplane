require('./helper');

require('../driver-examples');

vows.describe('Bing').addBatch({
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var Bing = require('drivers/bing');

  var extension;

  beforeEach(function() {
    extension = new JasmineExtension(document);
    this.driverClass = Bing;
  });

  'has a .driverName': function() {
    expect(Bing.driverName).toBe('Bing');
  });

  '.insertAttribution': {
    var bing;
    beforeEach(function() {
      loadFixtures('bing_dtw_sfo.html');
      bing = new Bing(extension);
      bing.insertAttribution();
    });
    'inserts a badge in the top area': function() {
      expect($('div#bookingAsst .punchline')).toHaveText('Brighter Planet');
    });
    'inserts a text attribution in the footer': function() {
      expect($('span.careplane-attribution-footer')).toHaveText('Emission estimates powered by Brighter Planet');
    });
  });

  itBehavesLikeA('polling Driver');
});
