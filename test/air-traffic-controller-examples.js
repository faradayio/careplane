var test = require('./helper'),
    vows = test.vows,
    assert = test.assert,
    sinon = test.sinon;

var $ = require('jquery'),
    fakeweb = require('fakeweb'),
    http = require('http');

http.register_intercept({
  uri: '/flights.json',
  host: 'impact.brighterplanet.com',
  body: JSON.stringify({ decisions: { carbon: { object: { value: 234 }}}})
});

exports.airTrafficController = function(driverClass, controllerClass, fixtureFile) {
  return {
    '#discoverTrips, #scoreTrips, #rateTrips': {
      'discovers, scores, and rates each trip, provides methodologies, and calls searchEmissionsComplete': function() {
        test.htmlFixture(fixtureFile, function(err, window) {
          var document = window.document;
          var extension = new test.plugin.Careplane(document);
          var driver = new driverClass(extension);
          var controller = new controllerClass(driver, document);

          var searchEmissionsComplete = sinon.spy('searchEmissionsComplete');
          controller.events.searchEmissionsComplete = searchEmissionsComplete;
          controller.discoverTrips();

          var numTrips = controller.trips.length;
          assert(controller.tripCount > 0, 'No trips found');
          assert.equal(controller.tripCount, numTrips, 'controller.tripCount is out of sync');
          controller.trips.forEach(function(trip) {
            assert.isTrue(trip.isScorable, 'trip ' + trip + ' is not scorable');
          });

          controller.scoreTrips();
          controller.trips.forEach(function(trip) {
            assert.isFalse(trip.isScorable);
          });

          controller.rateTrips();

          for(var i in controller.trips) {
            var p = controller.trips[i].footprintView.footprintParagraph();
            assert.match(p, /[\d,]+/);

            var div = controller.trips[i].infoView.target();
            assert($(div).find('.careplane-methodologies li a').length > 0);
            $(div).find('.careplane-methodologies li a').each(function(i, a) {
              assert.match($(a).text(), /[A-Z]{3}-[A-Z]{3}/);
            });

            var comparison = $(div).find('p.careplane-search-average-comparison').text();
            assert.match(comparison, /impact/);
          }

          assert(searchEmissionsComplete.called);
        });
      }
    }
  };
};
