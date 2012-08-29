var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var airTrafficControllerExamples = require('../../air-traffic-controller-examples');

var Bing = helper.plugin.require('./drivers/bing'),
    BingAirTrafficController = helper.plugin.require('./drivers/bing/bing-air-traffic-controller');

vows.describe('BingAirTrafficController').addBatch(
  airTrafficControllerExamples(BingAirTrafficController, 'bing_dtw_sfo.html', function($) {
    var controller = new BingAirTrafficController($);
    controller.searchData = JSON.parse(helper.readFixture('bing_dtw_sfo.json'));
    return controller;
  })
).addBatch({
  'with fixtures': {
    '#clear': {
      topic: function() {
        var $ = helper.qweryFixture('bing_dtw_sfo.html');
        var controller = new BingAirTrafficController($, '');
        return controller;
      },

      'loads searchData on first poll (when searchData is not yet set)': sinon.test(function(controller) {
        controller.searchData = null;
        this.spy(controller, 'fetchSearchData');
        controller.clear();
        sinon.assert.called(controller.fetchSearchData);
      }),
      'ignores empty searchData while waiting for AJAX': sinon.test(function(controller) {
        controller.searchData = [];
        this.spy(controller, 'fetchSearchData');
        this.spy(controller, 'discoverTrips');
        controller.clear();
        sinon.assert.notCalled(controller.fetchSearchData);
        sinon.assert.notCalled(controller.discoverTrips);
      }),
      'does the normal stuff once searchData is set': sinon.test(function(controller) {
        controller.searchData = JSON.parse(helper.readFixture('bing_dtw_sfo.json'));
        this.spy(controller, 'discoverTrips');
        this.spy(controller, 'scoreTrips');
        this.spy(controller, 'rateTrips');
        controller.clear();
        sinon.assert.called(controller.discoverTrips);
      })
    },

    '#findRequestId': {
      'finds a requestId hidden in one of the <a>s': function() {
        var $ = helper.qweryFixture('bing_dtw_sfo.html');
        var controller = new BingAirTrafficController($);
        assert.equal(controller.requestId(), '2012082912474683AcM.EtLnuvycs-RF6M0sLZTcjvsVsL0LCHkwTOpyRr0RRiOMErMN7A1xaAeXlhkeFBMCtWD1eNcv2r-5Lf3vl8xP9XbwkT5s-vAjXodeZoqmdrZvKIAbMX3eLewH8JbgpwjXdXx9wgMLL31j5shx8e6ohMtOMNkwX7dRJ0.LvN25iEnO6Y.-rbVb6a913md3taWYmr2JH.YzoZfM.im-UUXpYm-4PPldnWPD.S0Vt4CboysruRSLkNq0Zda9zcz2Xa-lNOTzkE5l8AR3-lCl3l1aQHpf.f1m8zTuGezogWaXOn8egbTdnXBqmbaZt-ukebsRQa9y9MSZcuUTFNKm2nEP8ro46J1WaO7wNGn.kg9DkK9442oNQwR2zXT08Ac-8kjG-8oefrWVYFTkNgEOgYVAf3BLFpL.W6MuU2TY.XbDOxagHcY8dEjLVVi9Ph9IzTp1jL-y51LqO1awVz.t6aRNF6VaswObYoScMrnSXc5LKez4oYc6Ub7WzmVKEUYS6nuFHKAeapaxgylU7HHKF57gRPTGZ5KqvRiv5O0ZdrMXny.toNZxHI8Em4cyzJc0hUBKqwR28c.bRljYQoBeQ7GPWP-Nmhj7abUu8fKWOyWP3S62VVaw3rXeVBHYfEtvJhhJpm1ZjQiPeqRptsHOJsqbM7Yvg0fabhNOb00cL.GK0w.LE1.1zjCwNOqvqlURer.QeyZGfRjSqx3dKPjU5RZkCsdv8BnmbCCdZqHWKiAlUXBpAJ-QTDZlIh5v0LoAaw__');
      }
    }
  },

  '#origin': {
    "returns the search's origin airport": function() {
      var controller = new BingAirTrafficController();
      controller.url = function() { return 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true'; };
      assert.equal(controller.origin(), 'DTW');
    }
  },
  '#destination': {
    "returns the search's origin airport": function() {
      var controller = new BingAirTrafficController();
      controller.url = function() { return 'http://www.bing.com/travel/flight/flightSearch?form=TRHPAS&q=flights+from+DTW+to+SFO+leave+08%2F27%2F2011+return+09%2F03%2F2011+adults%3A1+class%3ACOACH&shl=fly+DTW%3ESFO+%288%2F27-9%2F3%29&stoc=0&vo1=Detroit%2C+MI+%28DTW%29+-+Wayne+County+Airport&o=DTW&ve1=San+Francisco%2C+CA+%28SFO%29+-+San+Francisco+International+Airport&e=SFO&d1=08%2F27%2F2011&r1=09%2F03%2F2011&p=1&b=COACH&baf=true'; };
      assert.equal(controller.destination(), 'SFO');
    }
  }
}).export(module);
