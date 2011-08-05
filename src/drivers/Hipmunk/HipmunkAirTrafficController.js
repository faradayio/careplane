var $ = require('jquery-browserify');
var AirTrafficController = require('../../AirTrafficController');
var AirTrafficControllerEvents = require('../../AirTrafficControllerEvents');
var HipmunkTrip = require('./HipmunkTrip');

var HipmunkAirTrafficController = function(driver, doc) {
  this.driver = driver;
  this.doc = doc;
  this.url = doc ? this.doc.location.href : null;
  this.tripClass = HipmunkTrip;
  this.init();
};
HipmunkAirTrafficController.prototype = new AirTrafficController();
HipmunkAirTrafficController.events = new AirTrafficControllerEvents();

HipmunkAirTrafficController.prototype.tripId = function(tripElement) {
  return tripElement.id;
};

HipmunkAirTrafficController.prototype.origin = function() {
  var match = this.url.match(/from=([^&]+)/);
  return match ? match[1].toUpperCase() : '';
};
HipmunkAirTrafficController.prototype.destination = function() {
  var match = this.url.match(/to=([^&]+)/);
  return match ? match[1].toUpperCase() : '';
};

HipmunkAirTrafficController.prototype.tripElements = function() {
  return $('.results-table .routing', this.doc);
};

HipmunkAirTrafficController.prototype.updateViews = function(trip, rating) {
  trip.footprintView.updateRating(rating);
  trip.infoView.updateSearchAverage(this.hallOfFame.average(), trip);
  if(trip.embeddedInfoView())
    trip.embeddedInfoView().updateSearchAverage(this.hallOfFame.average(), trip);
  //trip.infoView.updateTripAverage(trip);  this is too difficult right now
};

HipmunkAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    $('', trip.tripElement).
      click(controller.events.purchase(this, trip));
  });
};

module.exports = HipmunkAirTrafficController;
