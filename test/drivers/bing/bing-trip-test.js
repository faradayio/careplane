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
    return new BingTrip('0', $, $('#resultRow_0').get(0), searchData);
  })
).addBatch({
  'with search data': {
    topic: function() {
      var $ = helper.qweryFixture('bing_dtw_sfo_flight.html');
      var trip = new BingTrip('0', $, $('#resultRow_0').get(0), searchData);
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
        assert.equal(trip.pricingSignature(),'AcM.EtLnuvycs-RF6M0sLZTcjvsVsL0LCHkwTOpyRr0RRiOMErMN7A1xaAeXlhkeFBMCtWD1eNcv2r-5Lf3vl8xP9XbwkT5s-vAjXodeZoqmdrZvKIAbMX3eLewH8JbgpwjXdXx9wgMLL31j5shxr4bs7AKyq-zvBm9jvOKOn9636urutGsHtd6xuCbuAuDSxrlsjDoaiebu8b0GVfxPCEbQW7D8a.1w3Y3aZCdwHSxRtldTzwzqEosWkVnc70lvXdzDK4y8jcUfoYRF-PSW0L3g1miOhn2-BEfQIyojIGp78RUpZv1sXj81cl98N-WCkT2hySkVho9RNwZeJWIPIUNec2mGGA1Bzu-NJwCAS0Nmbv9tg1C20KgaFfMp-u8ya3SKDfh6lGBwtC90TRYmmeS2RHC.3gkJs161eVnsXQP-');
      }
    }
  }
}).export(module);
