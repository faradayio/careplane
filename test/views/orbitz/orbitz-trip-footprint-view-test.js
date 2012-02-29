var helper = require('../../helper'),
    vows = helper.vows;

var OrbitzTripFootprintView = helper.plugin.require('./views/orbitz/orbitz-trip-footprint-view');

var tripFootprintViewExamples = require('../trip-footprint-view-examples');

vows.describe('OrbitzTripFootprintView').addBatch(
  tripFootprintViewExamples(OrbitzTripFootprintView, 'orbitz_dtw_sfo_result.html', '.result')
).export(module);
