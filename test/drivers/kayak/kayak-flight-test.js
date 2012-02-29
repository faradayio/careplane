var helper = require('../../helper'),
    vows = helper.vows,
    assert = helper.assert,
    sinon = helper.sinon;

var KayakFlight = helper.plugin.require('./drivers/kayak/kayak-flight');

vows.describe('KayakFlight').addBatch({
  '.parse': {
    topic: function() {
      var $ = qweryFixture('kayak_dtw_sfo_flight.html');
      return KayakFlight.parse($('.inlineflightitinerarylegs tr'));
    },

    'returns an array of flights': function(flights) {
      assert.equal(flights.length, 4);
    },
    
    'parses airline, origin, destination, and aircraft': function(flights) {
      asser.match(flights[0].airline, /Continental/);
      assert.equal(flights[0].origin, 'DTW');
      assert.equal(flights[0].destination, 'ORD');
      assert.equal(flights[0].aircraft, 'Canadair Regional Jet');

      asser.match(flights[1].airline, /Continental/);
      assert.equal(flights[1].origin, 'ORD');
      assert.equal(flights[1].destination, 'SFO');
      assert.equal(flights[1].aircraft, 'Boeing 757-200');

      asser.match(flights[2].airline, /Continental/);
      assert.equal(flights[2].origin, 'SFO');
      assert.equal(flights[2].destination, 'PHX');
      assert.equal(flights[2].aircraft, 'Airbus A320-100/200');

      assert.match(flights[3].airline, /United/);
      assert.equal(flights[3].origin, 'PHX');
      assert.equal(flights[3].destination, 'DTW');
      assert.equal(flights[3].aircraft, 'Airbus A319');
    }
  },

  '.parseAircraft': {
    'returns the name of the aircraft': function() {
      var $ = loadFixtures('kayak_dtw_sfo_flight.html');
      var extra = $('.inlineflightitinerarylegs td.extra').text();
      var aircraft = KayakFlight.parseAircraft(extra);
      assert.match(aircraft, 'Canadair');
    },
    'filters out aircraft details': function() {
      var aircraft = KayakFlight.parseAircraft('hi|Embraer (Winglets) (Narrow-body)|man');
      assert.isFalse(/\(/.match(aircraft));
    },
    'returns null if no aircraft found': function() {
      var aircraft = KayakFlight.parseAircraft('hi|there|man');
      assert.isNull(aircraft);
    }
  }
}).export(module);
