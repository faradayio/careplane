describe('Kayak', function() {
  it('has a .driverName', function() {
    expect(Kayak.driverName).toBe('Kayak');
  });

  describe('.insertAttribution', function() {
    var kayak;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo.html');
      var extension = new Careplane();
      extension.doc = window.document;
      kayak = new Kayak(extension);
      kayak.insertAttribution();
    });
    it('inserts a badge in the top area', function() {
      expect($('div#rightads')).toContain('script[src$="badge.js"]');
    });
    it('inserts a text attribution in the footer', function() {
      expect($('span.careplane-attribution-footer')).toHaveText(' · Emission estimates powered by Brighter Planet');
    });
  });
});
