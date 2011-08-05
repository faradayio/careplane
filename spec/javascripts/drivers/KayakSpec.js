describe('Kayak', function() {
  var TestExtension = require('browser/test/TestExtension');
  var Kayak = require('drivers/Kayak');

  var extension;

  beforeEach(function() {
    extension = new TestExtension(document);
    this.driverClass = Kayak;
  });

  it('has a .driverName', function() {
    expect(Kayak.driverName).toBe('Kayak');
  });

  describe('.insertAttribution', function() {
    var kayak;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo.html');
      kayak = new Kayak(extension);
      kayak.insertAttribution();
    });
    it('inserts a badge in the top area', function() {
      expect($('div#rightads .punchline')).toHaveText('Brighter Planet');
    });
    it('inserts a text attribution in the footer', function() {
      expect($('span.careplane-attribution-footer')).toHaveText(' · Emission estimates powered by Brighter Planet');
    });
  });

  itBehavesLikeA('polling Driver');
});
