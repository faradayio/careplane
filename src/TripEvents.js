TripEvents = {
  flightEmissionsComplete: function(trip, callback, onTripEmissionsComplete) {
    return function(cm1Response, flight) {
      trip.tallyFootprint(cm1Response.emission);
      callback(trip, cm1Response, flight);
      if(onTripEmissionsComplete && trip.isDone())
        onTripEmissionsComplete(cm1Response.emission);
    };
  }
};
