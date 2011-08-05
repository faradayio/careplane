describe('KayakTripFootprintView', function() {
  var KayakTripFootprintView = require('views/Kayak/KayakTripFootprintView');

  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.view = new KayakTripFootprintView($('.flightresult').get(0));
    this.view.init();
  });

  itBehavesLikeA('TripFootprintView');
});
