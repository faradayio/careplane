describe('BingFlight', function() {
  describe('.parse', function() {
    var flights;
    beforeEach(function() {
      var searchData = JSON.parse(readFixtures('bing_dtw_sfo.json'));
      var quote = searchData[0].quotes[0];
      var legs = quote.journey.stages[0].legs.concat(quote.journey.stages[1].legs);
      flights = BingFlight.parse(legs);
    });

    it('returns an array of flights', function() {
      expect(flights.length).toBe(4);
    });
    
    it('parses airline, origin, and destination', function() {
      expect(flights[0].airline).toBe('DL');
      expect(flights[0].origin).toBe('DTW');
      expect(flights[0].destination).toBe('LAX');

      expect(flights[1].airline).toBe('DL');
      expect(flights[1].origin).toBe('LAX');
      expect(flights[1].destination).toBe('SFO');

      expect(flights[2].airline).toBe('DL');
      expect(flights[2].origin).toBe('SFO');
      expect(flights[2].destination).toBe('CVG');

      expect(flights[3].airline).toBe('DL');
      expect(flights[3].origin).toBe('CVG');
      expect(flights[3].destination).toBe('DTW');
    });
  });
});
