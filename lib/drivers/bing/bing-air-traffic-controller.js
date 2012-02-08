var $ = require('jquery');
var AirTrafficController = require('../../air-traffic-controller'),
    AirTrafficControllerEvents = require('../../air-traffic-controller-events'),
    BingTrip = require('./bing-trip'),
    Util = require('../../util');

var BingAirTrafficController = function(driver, doc) {
  this.driver = driver;
  this.doc = doc;
  this.url = doc ? this.doc.location.href : null;
  this.tripClass = BingTrip;
  this.init();
};
BingAirTrafficController.prototype = new AirTrafficController();

BingAirTrafficController.events = new AirTrafficControllerEvents();

BingAirTrafficController.events.onFetchSearchJSONSuccess = function(controller) {
  return function(response) {
    controller.searchData = JSON.parse(response);
  };
};

BingAirTrafficController.prototype.clear = function() {
  if(this.searchData && this.searchData.length > 0) {
    this.discoverTrips();
    this.scoreTrips();
    this.rateTrips();
  } else if(this.searchData == null) {
    this.fetchSearchData();
  }
};

BingAirTrafficController.prototype.fetchSearchData = function() {
  this.searchData = [];
  var url = 'http://www.bing.com/travel/metasearch-client/poll?delivered=FCT_HIST,FCT_RT&requestId=';
  url += this.requestId();
  Util.fetch(url,
    BingAirTrafficController.events.onFetchSearchJSONSuccess(this));
};

BingAirTrafficController.prototype.requestId = function() {
  if(!this._requestId) {
    var as = $('a[href*=requestId]').not('.run_spec').not('.description')
    var href = as.attr('href');
    if(href) {
      var match = href.match(/requestId=([^&]+)/);
      this._requestId = match[1];
    }
  }

  return this._requestId;
};

BingAirTrafficController.prototype.routeMatches = function() {
  if(!this._routeMatches && this.url)
    this._routeMatches = this.url.match(/from\+([^\+]+)\+to\+([^\+]+)/);

  return this._routeMatches;
};

BingAirTrafficController.prototype.createTrip = function(tripElement, tripSegments) {
  var id = this.tripId(tripElement);
  var trip = new this.tripClass(id, tripElement, this.searchData);
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

module.exports = BingAirTrafficController;