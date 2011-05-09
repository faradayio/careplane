sharedExamplesFor('TripFootprintView', function() {
  describe('#updateRating', function() {
    it('assigns a rating to the this.trip <p> element', function() {
      this.view.updateRating(0);
      expect(this.view.footprintParagraph().css('color')).toBe('rgb(127, 127, 127)');
    });
    it('assigns a "green" rating if rating is positive', function() {
      this.view.updateRating(0.6);
      expect(this.view.footprintParagraph().css('color')).toMatch(/rgb\(5\d, 204, 5\d\)/);
    });
    it('assigns a "red" rating if rating is negative', function() {
      this.view.updateRating(-0.6);
      expect(this.view.footprintParagraph().css('color')).toMatch(/rgb\(204, 5\d, 5\d\)/);
    });
  });
});
