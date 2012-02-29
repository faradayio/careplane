var helper = require('../../helper'),
    vows = helper.vows;

var KayakTripInfoView = helper.plugin.require('./views/kayak/kayak-trip-info-view');

var tripInfoViewExamples = require('../trip-info-view-examples');

vows.describe('KayakTripInfoView').addBatch(
  tripInfoViewExamples(KayakTripInfoView)
).export(module);
