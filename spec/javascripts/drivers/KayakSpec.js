describe('Kayak', function() {
  it('has a .driverName', function() {
    expect(Kayak.driverName).toBe('Kayak');
  });

  describe('.insertAttribution', function() {
    var kayak;
    beforeEach(function() {
      loadFixtures('kayak_dtw_sfo.html');
      var extension = new Careplane();
      kayak = new Kayak(extension, document);
      kayak.insertAttribution();
    });
    it('inserts a badge in the top area', function() {
      expect($('div#rightads')).toContain('script[src$="badge.js"]');
    });
    it('inserts a text attribution in the footer', function() {
      expect($('span#careplane-attribution')).toHaveText(' · Emission estimates powered by Brighter Planet');
    });
  });
});
