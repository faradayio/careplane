require('./helper');

require('../driver-examples');

vows.describe('Orbitz').addBatch({
  var Orbitz = require('drivers/orbitz');

  beforeEach(function() {
    this.driverClass = Orbitz;
  });

  itBehavesLikeA('non-polling Driver');
});
