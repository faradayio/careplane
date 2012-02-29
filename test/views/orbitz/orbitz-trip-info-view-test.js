var helper = require('../../helper'),
    vows = helper.vows;

var OrbitzTripInfoView = helper.plugin.require('./views/orbitz/orbitz-trip-info-view');

var tripInfoViewExamples = require('../trip-info-view-examples');

vows.describe('OrbitzTripInfoView').addBatch(
  tripInfoViewExamples(OrbitzTripInfoView)
).export(module);
