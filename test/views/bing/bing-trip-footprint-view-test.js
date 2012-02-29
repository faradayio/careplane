var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var BingTripFootprintView = helper.plugin.require('./views/bing/bing-trip-footprint-view');

var tripFootprintViewExamples = require('../trip-footprint-view-examples');

vows.describe('BingTripFootprintView').addBatch(
  tripFootprintViewExamples(BingTripFootprintView, 'bing_dtw_sfo_flight.html', '#flightDetails_0')
);
