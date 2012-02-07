var test = require('../helper'),
    plugin = test.plugin;

var Orbitz = plugin.require('./drivers/orbitz');
var driverExamples = require('../driver-examples');

test.vows.describe('Orbitz').addBatch( 
  driverExamples.nonPollingDriver(Orbitz)
).export(module);
