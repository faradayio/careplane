AirTrafficController = function() {
  this.trips = [];
  this.tripCount = 0;
  this.completedTrips = 0;
};

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
  this.tripElements().each(function(i, tripElement) {
    if(!controller.tripIsAlreadyDiscovered(tripElement)) {
      controller.createTrip(tripElement);
    }
  });
};

AirTrafficController.prototype.tripIsAlreadyDiscovered = function(tripElement) {
  var p = tripElement.getElementsByClassName('careplane-info');
  return p.length > 0;
};

AirTrafficController.prototype.createTrip = function(tripElement) {
  var trip = new this.tripClass(tripElement);
  this.trips.push(trip);
  this.tripCount++;
  trip.init();
  trip.controller.init();
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
    var rating = HallOfFame.ratingFor(trip);
    trip.rate(rating);
    controller.updateViews(trip, rating);
  });
};

AirTrafficController.prototype.updateViews = function(trip, rating) {
  trip.footprintView.updateRating(rating);
  trip.infoView.updateSearchAverage(HallOfFame.average(), trip);
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



AirTrafficControllerEvents = function() {};
AirTrafficControllerEvents.prototype.flightEmissionsComplete = function(trip, cm1Response, flight) {
  trip.footprintView.update(trip.totalFootprint);
  trip.infoView.reportFlightMethodology(cm1Response.methodology, flight);
};

AirTrafficControllerEvents.prototype.tripEmissionsComplete = function(controller) {
  return function(trip, cm1Response, flight) {
    HallOfFame.induct(trip);

    if(++controller.completedTrips == controller.tripCount) {
      controller.events.searchEmissionsComplete(controller);
    }
  };
};

AirTrafficControllerEvents.prototype.searchEmissionsComplete = function(controller) {
  Careplane.currentExtension.tracker.search(Careplane.currentDriver.driverName(), controller.origin(), controller.destination(), HallOfFame.average());
  
  controller.sniffPurchases();
};

AirTrafficControllerEvents.prototype.pollInterval = function(controller) {
  return function() {
    controller.clear();
  };
};

AirTrafficControllerEvents.prototype.purchase = function(controller, trip) {
  return function() {
    Careplane.currentExtension.tracker.purchase(controller.origin(), controller.destination(),
                                                trip.cost(), controller.minCost(), trip.totalFootprint, HallOfFame.average());
  };
};

AirTrafficController.prototype.events = new AirTrafficControllerEvents();
