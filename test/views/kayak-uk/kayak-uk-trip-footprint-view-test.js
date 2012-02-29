var helper = require('../../helper'),
    vows = helper.vows;

var KayakUKTripFootprintView = helper.plugin.require('./views/kayak-uk/kayak-uk-trip-footprint-view');

var tripFootprintViewExamples = require('../trip-footprint-view-examples');

vows.describe('KayakUkTripFootprintView').addBatch(
  tripFootprintViewExamples(KayakUKTripFootprintView, 'kayak_uk_lhr_txl_flight.html', '.flightresult')
).export(module);
