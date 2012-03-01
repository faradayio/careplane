var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var BingTrip = helper.plugin.require('./drivers/bing/bing-trip');

var tripExamples = require('../../trip-examples');

var jsonpath = require('dkastner-JSONPath');

var searchData = JSON.parse(helper.readFixture('bing_dtw_sfo.json'));

vows.describe('BingTrip').addBatch(
  tripExamples('bing_dtw_sfo_flight.html', function($) {
    return new BingTrip('0', $, $('#flightDetails_0').get(0), searchData);
  })
).addBatch({
  'with search data': {
    topic: function() {
      var $ = helper.qweryFixture('bing_dtw_sfo_flight.html');
      var trip = new BingTrip('0', $, $('#flightDetails_0').get(0), searchData);
      return trip;
    },

    'provides searchData': function(trip) {
      assert.equal(trip.searchData.length, 1);
    },

    'parses an id': function(trip) {
      assert.equal(trip.id, '0');
    },

    '#pricingSignature': {
      'parses out the signature parameter': function(trip) {
        assert.equal(trip.pricingSignature(),'A6tT8o3xQqjRVMhxbd7URwdvDk.c5-BEclPKmOShUqcEzavTRzRCrLUKNuPclV9ZldL2QwE4vcb8DiNjB5OQAA2YFjNHECmX0vrjWFMpp.12Ueb5x08tXyVAh.Eu0ISLyay1Q6OxqxpAJTIvDwvXjAVdse7aDs7i83Dza-zEKouWeOTe1j0EX6YgG33MemBOwDcL15Km5lY5r1Ua5jZYS4KHu3071nVXiqONZW80cfjmTSTE5eq2IHkjR3j3M1G5CGvjczVRixCA2su01A2Zf8Y13c-Q.oo4Wgpzjy5eQpzaRUqVF1dR3c5O.k9ND34EHqQEQL6FewHluTYNClNwEt7YOR9Bi-FAJ.aMmnZfSUJbkV8v-lgv0G10RwfaSCKgGEnNvqb23Rv9yrlagsWgsTNta47q.fvVuxR5OpKt8bi-AWYZTGiy-1ZvuGNS-j.nfH3oQy9RyBFQVExUdTfp.DbCcOOHx0pK5jdx21urYkqI');
      }
    }
  }
}).export(module);
