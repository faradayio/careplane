describe('KayakTripFootprintView', function() {
  beforeEach(function() {
    loadFixtures('kayak_dtw_sfo_flight.html');
    this.view = new KayakTripFootprintView($('.flightresult').get(0));
    this.view.init();
  });

  itBehavesLikeA('TripFootprintView');
});
