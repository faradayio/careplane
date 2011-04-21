HallOfFame = {
  trips: {},

  clear: function() {
    this.trips = {};
    this.count = 0;
    this.scale = null;
  },

  induct: function(trip) {
    if(!this.trips[trip.id]) {
      this.trips[trip.id] = trip;
      this.count++;
      this.updateRatingScale();
    }
  },

  cleanest: function() {
    var minFootprint = 0;
    for(var i in this.trips) {
      var trip = this.trips[i];
      if(minFootprint == 0) {
        minFootprint = trip.totalFootprint;
      } else {
        minFootprint = Math.min(minFootprint, trip.totalFootprint);
      }
    }
    return minFootprint;
  },

  dirtiest: function() {
    var maxFootprint = 0;
    for(var i in this.trips) {
      maxFootprint = Math.max(maxFootprint, this.trips[i].totalFootprint);
    }
    return maxFootprint;
  },

  average: function() {
    if(this.count == 0) {
      return 0;
    } else {
      var totalFootprint = 0;
      for(var i in this.trips) {
        totalFootprint += this.trips[i].totalFootprint;
      }
      return totalFootprint / this.count;
    }
  },
  
  updateRatingScale: function() {
    var min = this.cleanest();
    var max = this.dirtiest();
    var avg = this.average();

    if(min == max) {
      this.scale = null;
    } else {
      var minDifference = avg - min;
      var maxDifference = max - avg;
      this.scale = {};

      for(var i in this.trips) {
        var trip = this.trips[i];
        var tripDifference = avg - trip.totalFootprint;

        var rating = 0;
        if(trip.totalFootprint > avg)
          rating = tripDifference / maxDifference;
        else if(trip.totalFootprint < avg)
          rating = tripDifference / minDifference;

        this.scale[trip.totalFootprint] = rating;
      }
    }
  },

  ratingFor: function(trip) {
    if(this.scale == null) {
      return 0;
    } else {
      return this.scale[trip.totalFootprint];
    }
  },

  count: 0
};
