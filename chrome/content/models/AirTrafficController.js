AirTrafficController = function() {};

AirTrafficController.prototype.clear = function() {
  var self = this;
  return function() {
    self.scoreTrips();
    self.rateTrips();
  };
};

AirTrafficController.prototype.rateTrips = function() {
  var scale = this.ratingScale();

  for(var i in this.trips) {
    var trip = this.trips[i];
    var rating = (scale == null) ? 0 : scale[trip.totalFootprint];
    trip.rate(rating);
  }
};

AirTrafficController.prototype.ratingScale = function() {
  var min = this.minFootprint();
  var max = this.maxFootprint();
  var avg = this.averageFootprint();
  //Careplane.log('Min: ' + min);
  //Careplane.log('Max: ' + max);
  //Careplane.log('Avg: ' + avg);

  if(min == max) {
    return null;
  } else {
    var minDifference = avg - min;
    var maxDifference = max - avg;
    var scale = {};

    for(var i in this.trips) {
      var trip = this.trips[i];
      var tripDifference = avg - trip.totalFootprint;
      //Careplane.log('Trip: ' + trip.totalFootprint);
      //Careplane.log('Difference: ' + tripDifference);

      var rating = 0;
      if(trip.totalFootprint > avg)
        rating = tripDifference / maxDifference;
      else if(trip.totalFootprint < avg)
        rating = tripDifference / minDifference;

      //Careplane.log('Rating: ' + rating);

      scale[trip.totalFootprint] = rating;
    }
    return scale;
  }
};

AirTrafficController.prototype.averageFootprint = function() {
  if(this.trips.length == 0) {
    return 0;
  } else {
    var totalFootprint = 0;
    for(var i in this.trips) {
      totalFootprint += this.trips[i].totalFootprint;
    }
    return totalFootprint / this.trips.length;
  }
};

AirTrafficController.prototype.minFootprint = function() {
  var minFootprint = 0;
  for(var i in this.trips) {
    if(minFootprint == 0) {
      minFootprint = this.trips[i].totalFootprint;
    } else {
      minFootprint = Math.min(minFootprint, this.trips[i].totalFootprint);
    }
  }
  return minFootprint;
};
AirTrafficController.prototype.maxFootprint = function() {
  var maxFootprint = 0;
  for(var i in this.trips) {
    maxFootprint = Math.max(maxFootprint, this.trips[i].totalFootprint);
  }
  return maxFootprint;
};
