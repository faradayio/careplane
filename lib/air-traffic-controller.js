var $ = require('jquery');

var HallOfFame = require('./hall-of-fame');

var HipmunkTrip = require('./drivers/hipmunk/hipmunk-trip');
var KayakTrip = require('./drivers/kayak/kayak-trip');
var KayakUKTrip = require('./drivers/kayak-uk/kayak-uk-trip');
var OrbitzTrip = require('./drivers/orbitz/orbitz-trip');

var AirTrafficControllerEvents = require('./air-traffic-controller-events');

var AirTrafficController = function() { };

AirTrafficController.prototype.init = function() {
  this.trips = [];
  this.tripCount = 0;
  this.completedTrips = 0;
  this.hallOfFame = new HallOfFame();
};
AirTrafficController.prototype.events = new AirTrafficControllerEvents();

AirTrafficController.prototype.poll = function() {
  setInterval(this.events.pollInterval(this), 1000);   // every 1 second
};

AirTrafficController.prototype.clear = function() {
  this.discoverTrips();
  this.scoreTrips();
  this.rateTrips();
};

AirTrafficController.prototype.discoverTrips = function() {
  var controller = this;
  this.undiscoveredTripElements().each(function(i, tripElement) {
    controller.createTrip(tripElement);
  });
};

AirTrafficController.prototype.undiscoveredTripElements = function() {
  return this.tripElements().not(this.discoveredTripElements());
};

AirTrafficController.prototype.discoveredTripElements = function() {
  return $(this.trips).map(function(i, trip) {
    return trip.tripElement;
  });
};

AirTrafficController.prototype.tripIsAlreadyDiscovered = function(tripElement) {
  var p = tripElement.getElementsByClassName('careplane-info');
  return p.length > 0;
};

AirTrafficController.prototype.tripId = function(tripElement) {
  return tripElement.id.match(/\d+/)[0];
};

AirTrafficController.prototype.createTrip = function(tripElement) {
  var id = this.tripId(tripElement);
  var trip = new this.tripClass(this.driver.extension, id, tripElement);
  this.trips.push(trip);
  this.tripCount++;
  trip.init();
  trip.controller.init();
  return trip;
};

AirTrafficController.prototype.scoreTrips = function() {
  for(var i in this.trips) {
    var trip = this.trips[i];
    if(trip.isScorable) {
      trip.score(this.events.flightEmissionsComplete,
                 this.events.tripEmissionsComplete(this));
    }
  }
};

AirTrafficController.prototype.rateTrips = function() {
  var controller = this;
  this.eachFinishedTrip(function(trip) {
    var rating = controller.hallOfFame.ratingFor(trip);
    trip.rate(rating);
    controller.updateViews(trip, rating);
  });
};

AirTrafficController.prototype.updateViews = function(trip, rating) {
  trip.footprintView.updateRating(rating);
  trip.infoView.updateSearchAverage(this.hallOfFame.average(), trip);
  //trip.infoView.updateTripAverage(trip);  this is too difficult right now
};

AirTrafficController.prototype.finishedTrips = function() {
  var list = this.trips.filter(function(trip) {
    return trip.isDone();
  });
  return list;
};

AirTrafficController.prototype.eachTrip = function(callback) {
  this.trips.map(callback);
};
AirTrafficController.prototype.eachFinishedTrip = function(callback) {
  this.finishedTrips().map(callback);
};

AirTrafficController.prototype.minCost = function() {
  var min;
  this.eachTrip(function(trip) {
    if(min == null) {
      min = trip.cost();
    } else {
      min = Math.min(min, trip.cost());
    }
  });
  return min;
};

module.exports = AirTrafficController;
