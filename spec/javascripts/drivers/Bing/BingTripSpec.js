var jsonpath = require('JSONPath');

describe('BingTrip', function() {
  beforeEach(function() {
    loadFixtures('bing_dtw_sfo_flight.html');
    var searchData = JSON.parse(readFixtures('bing_dtw_sfo.json'));
    var legs = jsonpath.eval(searchData[0], '$.quotes[?(@.journeyId == 0)].journey.stages[*].legs[*]');
    this.trip = new BingTrip('0', $('#flightDetails_0').get(0), legs, 344);
    TestExtension.urlMap['http://www.kayak.com/s/run/inlineDetails/flight'] = {
      'status': 0,
      'message': kayakFlightDetails
    };
  });

  itBehavesLikeA('Trip');

  it('provides legData', function() {
    expect(this.trip.legData.length).toBe(4);
  });

  it('parses an id', function() {
    expect(this.trip.id).toBe('0');
  });
});
