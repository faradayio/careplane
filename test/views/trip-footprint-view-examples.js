var helper = require('../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

module.exports = function(viewClass, fixtureFile, tripSelector) {
  var $ = helper.qweryFixture(fixtureFile);
  var view = new viewClass($, $(tripSelector).get(0));
  view.init();

  return {
    '#updateRating': {
      'assigns a rating to the this.trip <p> element': function() {
        this.view.updateRating(0);
        var color = this.view.footprintParagraph().css('color');
        if(color.search(/rgb/) > -1) {
          assert.equal(color, 'rgb(127, 127, 127)');
        } else {
          assert.equal(color, 'hsl(120, 0%, 50%)');
        }
      },
      'assigns a "green" rating if rating is positive': function() {
        this.view.updateRating(0.6);
        var color = this.view.footprintParagraph().css('color');
        if(color.search(/rgb/) > -1) {
          assert.match(color, /rgb\(5\d, 204, 5\d\)/);
        } else {
          assert.match(color, /hsl\(120, 6\d%, 5\d\%\)/);
        }
      },
      'assigns a "red" rating if rating is negative': function() {
        this.view.updateRating(-0.6);
        var color = this.view.footprintParagraph().css('color');
        if(color.search(/rgb/) > -1) {
          assert.match(color, /rgb\(204, 5\d, 5\d\)/);
        } else {
          assert.match(color, /hsl\(0, 6\d%, 5\d\%\)/);
        }
      }
    }
  };
};
