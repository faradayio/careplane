BingTrip = function(id, tripElement, legData, cost) {
  this.id = id;
  this.tripElement = tripElement;
  this.legData = legData;
  this._cost = cost;
  this.doc = this.tripElement.ownerDocument;
  this.controller = new TripController(this);
  this.footprintView = new BingTripFootprintView(this.tripElement);
  this.infoView = new BingTripInfoView(this.tripElement);
};
BingTrip.prototype = new Trip();

BingTrip.events = {
  tripDetailsSuccess: function(trip, success) {
    return function(result) {
      var div = $(trip.doc.createElement('div'));
      div.addClass('careplane-trip-details');
      div.html(result.message);
      div.css('display', 'none');
      $(trip.tripElement).append(div);

      trip.flights = BingFlight.parse($('.inlineflightitinerarylegs tr', trip.tripElement));
      success(trip);
    };
  }
};

BingTrip.prototype.cost = function() {
  return this._cost;
};

BingTrip.prototype.tripDetailsContainer = function() {
  if(!this._tripDetailsContainer)
    this._tripDetailsContainer = this.tripElement.getElementsByClassName('careplane-trip-details')[0];

  return this._tripDetailsContainer;
};

BingTrip.prototype.searchIdentifier = function() {
  var form = this.tripElement.ownerDocument.forms[0];
  if(form) {
    return form.elements.namedItem('originsid').value;
  }
};

BingTrip.prototype.loadFlights = function(success) {
  this.flights = BingFlight.parse(this.legData);
  success(this);
};
