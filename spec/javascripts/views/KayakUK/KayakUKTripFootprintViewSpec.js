describe('KayakUKTripFootprintView', function() {
  var KayakUKTripFootprintView = require('views/KayakUK/KayakUKTripFootprintView');

  beforeEach(function() {
    loadFixtures('kayak_uk_lhr_txl_flight.html');
    this.view = new KayakUKTripFootprintView($('.flightresult').get(0));
    this.view.init();
  });

  itBehavesLikeA('TripFootprintView');
});
