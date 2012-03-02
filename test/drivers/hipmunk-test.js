var helper = require('../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var Hipmunk = helper.plugin.require('./drivers/hipmunk');

var driverExamples = require('../driver-examples');

vows.describe('Hipmunk').addBatch(
  driverExamples(Hipmunk)
).addBatch({
  'has a .driverName': function() {
    assert.equal(Hipmunk.driverName, 'Hipmunk');
  }
}).export(module);
