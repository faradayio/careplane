describe('BingTrip', function() {
  var jsonpath = require('dkastner-JSONPath');
  var JasmineExtension = require('browser/jasmine/jasmine-extension');
  var BingTrip = require('drivers/bing/bing-trip');

  beforeEach(function() {
    loadFixtures('bing_dtw_sfo.html');
    var searchData = JSON.parse(readFixtures('bing_dtw_sfo.json'));
    this.trip = new BingTrip('0', $('#flightDetails_0').get(0), searchData);
  });

  itBehavesLikeA('Trip');

  it('provides searchData', function() {
    expect(this.trip.searchData.length).toBe(1);
  });

  it('parses an id', function() {
    expect(this.trip.id).toBe('0');
  });

  describe('#pricingSignature', function() {
    it('parses out the signature parameter', function() {
      expect(this.trip.pricingSignature()).toBe('A6tT8o3xQqjRVMhxbd7URwdvDk.c5-BEclPKmOShUqcEzavTRzRCrLUKNuPclV9ZldL2QwE4vcb8DiNjB5OQAA2YFjNHECmX0vrjWFMpp.12Ueb5x08tXyVAh.Eu0ISLyay1Q6OxqxpAJTIvDwvXjAVdse7aDs7i83Dza-zEKouWeOTe1j0EX6YgG33MemBOwDcL15Km5lY5r1Ua5jZYS4KHu3071nVXiqONZW80cfjmTSTE5eq2IHkjR3j3M1G5CGvjczVRixCA2su01A2Zf8Y13c-Q.oo4Wgpzjy5eQpzaRUqVF1dR3c5O.k9ND34EHqQEQL6FewHluTYNClNwEt7YOR9Bi-FAJ.aMmnZfSUJbkV8v-lgv0G10RwfaSCKgGEnNvqb23Rv9yrlagsWgsTNta47q.fvVuxR5OpKt8bi-AWYZTGiy-1ZvuGNS-j.nfH3oQy9RyBFQVExUdTfp.DbCcOOHx0pK5jdx21urYkqI');
    });
  });
});
