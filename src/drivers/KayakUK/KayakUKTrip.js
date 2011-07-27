KayakUKTrip = function(tripElement) {
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
  this.id = this.tripElement.id.match(/\d+/)[0];
  this.controller = new TripController(this);
  this.footprintView = new KayakTripFootprintView(this.tripElement);
  this.infoView = new KayakTripInfoView(this.tripElement);
};
KayakUKTrip.prototype = new KayakTrip();

KayakUKTrip.events = KayakTrip.events;

KayakUKTrip.prototype.detailUrl = function() {
  return 'http://www.kayak.co.uk/s/run/inlineDetails/flight?searchid=' + this.searchIdentifier() + '&resultid=' + this.resultIdentifier() + '&localidx=' + this.id + '&fs=;';
};
