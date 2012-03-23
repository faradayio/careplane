var AirTrafficController = require('../../air-traffic-controller'),
    AirTrafficControllerEvents = require('../../air-traffic-controller-events'),
    HipmunkTrip = require('./hipmunk-trip'),
    _ = require('underscore');

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
  this.searchData = JSON.parse(controller.$('#pilfered-hipmunk-data').text());
  _.each(this.searchData, function(tab) {
    _.each(tab, function(routings) {
      _.each(routings, function(routing) {
        var found = _.find(controller.trips, function(trip) {
          return trip.id == routing.id;
        });
        if(typeof found == 'undefined') {
          controller.createTrip(routing);
        }
      });
    });
  });
};

HipmunkAirTrafficController.prototype.createTrip = function(routing) {
  var tripElement = this.$('#' + routing.id);
  var trip = new this.tripClass(routing.id, this.$, tripElement, routing);
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
