var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var jsonpath = require('dkastner-JSONPath');
var BingFlight = helper.plugin.require('./drivers/bing/bing-flight');

vows.describe('BingFlight').addBatch({
  '.parse': {
    topic: function() {
      return JSON.parse(helper.readFixture('bing_dtw_sfo.json'));
    },

    'parses a standard set of flights': function(searchData) {
      var signature = searchData[0].quotes[0].pricing.signature;
      var flights = BingFlight.parse(searchData, signature);

      assert.equal(flights.length, 4);

      assert.equal(flights[0].airline, 'FL');
      assert.equal(flights[0].origin, 'DTW');
      assert.equal(flights[0].destination, 'ATL');

      assert.equal(flights[1].airline, 'FL');
      assert.equal(flights[1].origin, 'ATL');
      assert.equal(flights[1].destination, 'SFO');

      assert.equal(flights[2].airline, 'FL');
      assert.equal(flights[2].origin, 'SFO');
      assert.equal(flights[2].destination, 'ATL');

      assert.equal(flights[3].airline, 'FL');
      assert.equal(flights[3].origin, 'ATL');
      assert.equal(flights[3].destination, 'DTW');
    },
    'follows referenced legs': function(searchData) {
      var signature = jsonpath.eval(searchData[0], '$.quotes[?(@.journeyId == "j_8")].pricing.signature')[0];
      var flights = BingFlight.parse(searchData, signature);

      assert.equal(flights.length, 4);

      assert.equal(flights[0].airline, 'FL');
      assert.equal(flights[0].origin, 'DTW');
      assert.equal(flights[0].destination, 'ATL');

      assert.equal(flights[1].airline, 'FL');
      assert.equal(flights[1].origin, 'ATL');
      assert.equal(flights[1].destination, 'SFO');

      assert.equal(flights[2].airline, 'FL');
      assert.equal(flights[2].origin, 'SFO');
      assert.equal(flights[2].destination, 'ATL');

      assert.equal(flights[3].airline, 'FL');
      assert.equal(flights[3].origin, 'ATL');
      assert.equal(flights[3].destination, 'DTW');
    }
  }
}).export(module);
