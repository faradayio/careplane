if(typeof require != 'undefined') {
  var jsonpath = require('JSONPath');
}

BingAirTrafficController = function(doc) {
  this.doc = doc;
  this.url = doc ? this.doc.location.href : null;
  this.tripClass = BingTrip;
  this.trips = [];
  this.tripCount = 0;
  this.completedTrips = 0;
  this.requestId = this.findRequestId();
};
BingAirTrafficController.prototype = new AirTrafficController();

BingAirTrafficController.events = new AirTrafficControllerEvents();

BingAirTrafficController.events.onFetchSearchJSONSuccess = function(controller) {
  return function(data) {
    controller.searchData = data;
  };
};

BingAirTrafficController.prototype.clear = function() {
  if(this.searchData) {
    this.discoverTrips();
    this.scoreTrips();
    this.rateTrips();
  } else {
    this.searchData = [];
    Careplane.fetch({
      url: 'http://www.bing.com/travel/metasearch-client/poll?requestId=' + this.requestId + '&delivered=FCT_HIST,FCT_RT',
      success: BingAirTrafficController.events.onFetchSearchJSONSuccess(this)
    });
  }
};

BingAirTrafficController.prototype.findRequestId = function() {
  var href = $('a[href*="requestId"]').attr('href');
  if(href) {
    var match = href.match(/requestId=([^&]+)/);
    return match[1];
  } else {
    return '';
  }
};

BingAirTrafficController.prototype.routeMatches = function() {
  if(!this._routeMatches && this.url)
    this._routeMatches = this.url.match(/from\+([^\+]+)\+to\+([^\+]+)/);

  return this._routeMatches;
};

BingAirTrafficController.prototype.createTrip = function(tripElement, tripSegments) {
  var id = this.tripId(tripElement);
  var cost = jsonpath.eval(this.searchData[0], '$.quotes[journeyId=' + id + '].pricing.price');
  var legData = jsonpath.eval(this.searchData[0], '$.quotes[?(@.journeyId == ' + id + ')].journey.stages[*].legs[*]');
  var trip = new this.tripClass(id, tripElement, legData, cost);
  this.trips.push(trip);
  this.tripCount++;
  trip.init();
  trip.controller.init();
  return trip;
};


BingAirTrafficController.prototype.origin = function() {
  return this.routeMatches() ? this.routeMatches()[1] : '';
};
BingAirTrafficController.prototype.destination = function() {
  return this.routeMatches() ? this.routeMatches()[2] : '';
};

BingAirTrafficController.prototype.tripElements = function() {
  return $('div[id*=flightDetailsHolder_]', this.doc);
};

BingAirTrafficController.prototype.sniffPurchases = function() {
  var controller = this;
  this.eachTrip(function(trip) {
    $('.results_price', trip.tripElement).
      click(controller.events.purchase(controller, trip));
  });
};
