describe('BingFlight', function() {
  var jsonpath = require('JSONPath');
  var TestExtension = require('browser/test/TestExtension');
  var BingFlight = require('drivers/Bing/BingFlight');
  
  describe('.parse', function() {
    var flights, extension, searchData;
    beforeEach(function() {
      extension = new TestExtension(document);
      searchData = JSON.parse(readFixtures('bing_dtw_sfo.json'));
    });

    it('parses a standard set of flights', function() {
      var signature = searchData[0].quotes[0].pricing.signature;
      flights = BingFlight.parse(extension, searchData, signature);

      expect(flights.length).toBe(4);

      expect(flights[0].airline).toBe('US');
      expect(flights[0].origin).toBe('DTW');
      expect(flights[0].destination).toBe('CLT');

      expect(flights[1].airline).toBe('US');
      expect(flights[1].origin).toBe('CLT');
      expect(flights[1].destination).toBe('SFO');

      expect(flights[2].airline).toBe('US');
      expect(flights[2].origin).toBe('SFO');
      expect(flights[2].destination).toBe('PHX');

      expect(flights[3].airline).toBe('US');
      expect(flights[3].origin).toBe('PHX');
      expect(flights[3].destination).toBe('DTW');
    });
    it('follows referenced legs', function() {
      var signature = jsonpath.eval(searchData[0], '$.quotes[?(@.journeyId == "17")].pricing.signature')[0];
      flights = BingFlight.parse(extension, searchData, signature);

      expect(flights.length).toBe(4);

      expect(flights[0].airline).toBe('US');
      expect(flights[0].origin).toBe('DTW');
      expect(flights[0].destination).toBe('CLT');

      expect(flights[1].airline).toBe('US');
      expect(flights[1].origin).toBe('CLT');
      expect(flights[1].destination).toBe('SFO');

      expect(flights[2].airline).toBe('US');
      expect(flights[2].origin).toBe('SFO');
      expect(flights[2].destination).toBe('PHX');

      expect(flights[3].airline).toBe('US');
      expect(flights[3].origin).toBe('PHX');
      expect(flights[3].destination).toBe('DTW');
    });
  });
});
