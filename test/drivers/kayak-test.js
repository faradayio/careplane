require('./helper');

require('../driver-examples');

vows.describe('Kayak').addBatch({
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var Kayak = require('drivers/kayak');

  var extension;

  beforeEach(function() {
    extension = new JasmineExtension(document);
    this.driverClass = Kayak;
  });

  'has a .driverName': function() {
    expect(Kayak.driverName).toBe('Kayak');
  });

  '.insertAttribution': {
    var kayak;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo.html');
      kayak = new Kayak(extension);
      kayak.insertAttribution();
    });
    'inserts a badge in the top area': function() {
      expect($('div#rightads .punchline')).toHaveText('Brighter Planet');
    });
    'inserts a text attribution in the footer': function() {
      expect($('span.careplane-attribution-footer')).toHaveText(' · Emission estimates powered by Brighter Planet');
    });
  });

  itBehavesLikeA('polling Driver');
});
