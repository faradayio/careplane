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
    expect(Hipmunk.driverName).toBe('Hipmunk');
  }
}).export(module);
