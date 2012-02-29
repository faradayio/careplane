var test = require('../helper'),
    vows = test.vows,
    plugin = test.plugin;

var Orbitz = plugin.require('./drivers/orbitz');
var driverExamples = require('../driver-examples');

vows.describe('Orbitz').addBatch( 
  driverExamples(Orbitz)
).export(module);
