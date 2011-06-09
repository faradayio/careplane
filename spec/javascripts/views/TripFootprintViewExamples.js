sharedExamplesFor('TripFootprintView', function() {
  describe('#updateRating', function() {
    it('assigns a rating to the this.trip <p> element', function() {
      this.view.updateRating(0);
      var color = this.view.footprintParagraph().css('color');
      if(color.search(/rgb/) > -1) {
        expect(color).toBe('rgb(127, 127, 127)');
      } else {
        expect(color).toBe('hsl(120, 0%, 50%)');
      }
    });
    it('assigns a "green" rating if rating is positive', function() {
      this.view.updateRating(0.6);
      var color = this.view.footprintParagraph().css('color');
      if(color.search(/rgb/) > -1) {
        expect(color).toMatch(/rgb\(5\d, 204, 5\d\)/);
      } else {
        expect(color).toMatch(/hsl\(120, 6\d%, 5\d\%\)/);
      }
    });
    it('assigns a "red" rating if rating is negative', function() {
      this.view.updateRating(-0.6);
      var color = this.view.footprintParagraph().css('color');
      if(color.search(/rgb/) > -1) {
        expect(color).toMatch(/rgb\(204, 5\d, 5\d\)/);
      } else {
        expect(color).toMatch(/hsl\(0, 6\d%, 5\d\%\)/);
      }
    });
  });
});
