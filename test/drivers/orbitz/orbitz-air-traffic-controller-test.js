var test = require('../../helper'),
    vows = test.vows,
    assert = test.assert,
    sinon = test.sinon;

var Careplane = test.plugin.Careplane,
    Orbitz = test.plugin.require('./drivers/orbitz'),
    OrbitzAirTrafficController = test.plugin.require('./drivers/orbitz/orbitz-air-traffic-controller');

var airTrafficControllerExamples = require('../../air-traffic-controller-examples');

vows.describe('OrbitzAirTrafficController').addBatch(
  airTrafficControllerExamples(OrbitzAirTrafficController, 'orbitz_dtw_sfo.html')
).export(module);
