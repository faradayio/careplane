var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var BingTripInfoView = helper.plugin.require('./views/bing/bing-trip-info-view');

var tripInfoViewExamples = require('../trip-info-view-examples');

vows.describe('BingTripInfoView').addBatch(
  tripInfoViewExamples(BingTripInfoView)
).export(module);
