var helper = require('../../helper'),
    vows = helper.vows;

var HipmunkTripInfoView = helper.plugin.require('./views/hipmunk/hipmunk-trip-info-view');

var tripInfoViewExamples = require('../trip-info-view-examples');

vows.describe('HipmunkTripInfoView').addBatch(
  tripInfoViewExamples(HipmunkTripInfoView)
).export(module);
