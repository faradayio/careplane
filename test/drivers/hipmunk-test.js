require('./helper');

require('../driver-examples');

vows.describe('Hipmunk').addBatch({
  var Hipmunk = require('drivers/hipmunk');

  beforeEach(function() {
    this.driverClass = Hipmunk;
  });

  'has a .driverName': function() {
    expect(Hipmunk.driverName).toBe('Hipmunk');
  });

  itBehavesLikeA('polling Driver');
});
