var helper = require('../../helper'),
    vows = helper.vows;

var KayakTripFootprintView = helper.plugin.require('./views/kayak/kayak-trip-footprint-view');

var tripFootprintViewExamples = require('../trip-footprint-view-examples');

vows.describe('KayakTripFootprintView').addBatch(
  tripFootprintViewExamples(KayakTripFootprintView, 'kayak_dtw_sfo_flight.html', '.flightresult')
).export(module);
