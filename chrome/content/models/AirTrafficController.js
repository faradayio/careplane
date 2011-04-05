AirTrafficController = function() {};

AirTrafficController.prototype.clear = function() {
  var controller = this;
  return function() {
    controller.scoreTrips();
    controller.rateTrips();
  };
};

AirTrafficController.prototype.rateTrips = function() {
  var scale = this.ratingScale();

  var trips = this.finishedTrips();
  for(var i in trips) {
    var trip = trips[i];
    var rating = (scale == null) ? 0 : scale[trip.totalFootprint];
    trip.rate(rating);
  }
};

AirTrafficController.prototype.ratingScale = function() {
  var min = this.minFootprint();
  var max = this.maxFootprint();
  var avg = this.averageFootprint();
  Careplane.log('Min: ' + min);
  Careplane.log('Max: ' + max);
  Careplane.log('Avg: ' + avg);

  if(min == max) {
    return null;
  } else {
    var minDifference = avg - min;
    var maxDifference = max - avg;
    var scale = {};

    var trips = this.finishedTrips();
    for(var i in trips) {
      var trip = trips[i];
      var tripDifference = avg - trip.totalFootprint;
      Careplane.log('Trip: ' + trip.totalFootprint);
      Careplane.log('Difference: ' + tripDifference);

      var rating = 0;
      if(trip.totalFootprint > avg)
        rating = tripDifference / maxDifference;
      else if(trip.totalFootprint < avg)
        rating = tripDifference / minDifference;

      Careplane.log('Rating: ' + rating);

      scale[trip.totalFootprint] = rating;
    }
    return scale;
  }
};

AirTrafficController.prototype.finishedTrips = function() {
  var list = this.trips.filter(function(trip) {
    return trip.isDone();
  });
  return list;
};

AirTrafficController.prototype.averageFootprint = function() {
  var trips = this.finishedTrips();
  if(trips.length == 0) {
    return 0;
  } else {
    var totalFootprint = 0;
    for(var i in trips) {
      var trip = trips[i];
      if(trip.isDone()) {
        totalFootprint += trips[i].totalFootprint;
      }
    }
    return totalFootprint / trips.length;
  }
};

AirTrafficController.prototype.minFootprint = function() {
  var trips = this.finishedTrips();
  var minFootprint = 0;
  for(var i in trips) {
    var trip = trips[i];
    if(minFootprint == 0) {
      minFootprint = trips[i].totalFootprint;
    } else {
      minFootprint = Math.min(minFootprint, trips[i].totalFootprint);
    }
  }
  return minFootprint;
};

AirTrafficController.prototype.maxFootprint = function() {
  var trips = this.finishedTrips();
  var maxFootprint = 0;
  for(var i in trips) {
    maxFootprint = Math.max(maxFootprint, trips[i].totalFootprint);
  }
  return maxFootprint;
};
