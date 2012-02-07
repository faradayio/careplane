var helper = require('./helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

require('../driver-examples');

vows.describe('Orbitz').addBatch({
  var Orbitz = require('drivers/orbitz');

  beforeEach(function() {
    this.driverClass = Orbitz;
  });

  itBehavesLikeA('non-polling Driver');
});
