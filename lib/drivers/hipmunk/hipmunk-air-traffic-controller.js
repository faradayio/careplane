var AirTrafficController = require('../../air-traffic-controller'),
    AirTrafficControllerEvents = require('../../air-traffic-controller-events'),
    HipmunkTrip = require('./hipmunk-trip');

var HipmunkAirTrafficController = function($) {
  this.$ = $;
  this.tripClass = HipmunkTrip;
  this.init();
};
HipmunkAirTrafficController.prototype = new AirTrafficController();
HipmunkAirTrafficController.events = new AirTrafficControllerEvents();

HipmunkAirTrafficController.prototype.tripId = function(tripElement) {
  return tripElement.id;
};

HipmunkAirTrafficController.prototype.origin = function() {
  var match = this.url().match(/from=([^&]+)/);
  return match ? match[1].toUpperCase() : '';
};
HipmunkAirTrafficController.prototype.destination = function() {
  var match = this.url().match(/to=([^&]+)/);
  return match ? match[1].toUpperCase() : '';
};

HipmunkAirTrafficController.prototype.tripElements = function() {
  return this.$('.results-table .routing', this.doc);
};

HipmunkAirTrafficController.prototype.discoverTrips = function() {
  var controller = this;
  this.searchData = null;
  this.undiscoveredTripElements().each(function(i, tripElement) {
    controller.searchData = controller.searchData || JSON.parse(controller.$('#pilfered-hipmunk-data').text());
    controller.createTrip(tripElement);
  });
};

HipmunkAirTrafficController.prototype.createTrip = function(tripElement) {
  var id = this.tripId(tripElement);
  var trip = new this.tripClass(id, this.$, tripElement, this.searchData);
  this.trips.push(trip);
  this.tripCount++;
  trip.init();
  trip.controller.init();
  return trip;
};

HipmunkAirTrafficController.prototype.updateViews = function(trip, rating) {
  trip.footprintView.updateRating(rating);
  trip.infoView.updateSearchAverage(this.hallOfFame.average(), trip);
  //trip.infoView.updateTripAverage(trip);  this is too difficult right now
};

HipmunkAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    controller.$('', trip.tripElement).
      click(controller.events.purchase(this, trip));
  });
};

module.exports = HipmunkAirTrafficController;
