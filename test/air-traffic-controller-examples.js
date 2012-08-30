var test = require('./helper'),
    vows = test.vows,
    assert = test.assert,
    sinon = test.sinon,
    _ = require('underscore');

var fakeweb = require('fakeweb'),
    http = require('http');

http.register_intercept({
  uri: '/flights.json',
  host: 'impact.brighterplanet.com',
  body: JSON.stringify({ decisions: { carbon: { object: { value: 234 }}}})
});

module.exports = function(controllerClass, fixtureFile, callback) {
  var $ = test.qweryFixture(fixtureFile);
  var controller;
  if(callback)
    controller = callback($);
  else
    controller = new controllerClass($);

  return {
    '#discoverTrips, #scoreTrips, #rateTrips': {
      'discovers, scores, and rates each trip, provides methodologies, and calls searchEmissionsComplete': sinon.test(function() {
        this.spy(controller.events, 'searchEmissionsComplete');
        controller.discoverTrips();

        var numTrips = controller.trips.length;
        assert(controller.tripCount > 0, 'No trips found');
        assert.equal(controller.tripCount, numTrips, 'controller.tripCount is out of sync');
        controller.trips.forEach(function(trip) {
          assert.isTrue(trip.isScorable, 'trip ' + trip + ' is not scorable');
        });

        controller.scoreTrips();
        controller.trips.forEach(function(trip) {
          assert.isFalse(trip.isScorable, 'trip is scorable after call to scoreTrips()');
        });

        assert.isEmpty(controller.undiscoveredTripElements(), 'there are still undiscovered trips');

        controller.rateTrips();

        _.each(controller.trips, function(trip) {
          var p = trip.footprintView.footprintParagraph();
          assert.match(p.text(), /[\d,]+/);

          var div = trip.infoView.target();
          assert($(div).find('.careplane-methodologies li a').length > 0);
          $(div).find('.careplane-methodologies li a').each(function(i, a) {
            assert.match($(a).text(), /[A-Z]{3}-[A-Z]{3}/);
          });

          var comparison = $(div).find('p.careplane-search-average-comparison').text();
          assert.match(comparison, /impact/);
        });

        assert(controller.events.searchEmissionsComplete.called);
      })
    }
  };
};
