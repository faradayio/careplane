var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var Careplane = helper.plugin.Careplane,
    Orbitz = helper.plugin.require('./drivers/orbitz'),
    OrbitzAirTrafficController = helper.plugin.require('./drivers/orbitz/orbitz-air-traffic-controller');

var airTrafficControllerExamples = require('../../air-traffic-controller-examples');

var fakeweb = require('fakeweb'),
    http = require('http');

http.register_intercept({
  uri: '/shop/home',
  host: 'www.orbitz.com',
  body: helper.readFixture('orbitz_dtw_sfo_flight_details.html')
});

vows.describe('OrbitzAirTrafficController').addBatch(
  airTrafficControllerExamples(OrbitzAirTrafficController, 'orbitz_dtw_sfo.html')
).export(module);
