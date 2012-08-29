var jsonpath = require('dkastner-JSONPath');

var Trip = require('../../trip'),
    TripController = require('../../controllers/trip-controller'),
    BingTripFootprintView = require('../../views/bing/bing-trip-footprint-view'),
    BingTripInfoView = require('../../views/bing/bing-trip-info-view'),
    BingFlight = require('./bing-flight');

var BingTrip = function(id, $, tripElement, searchData) {
  this.id = id;
  this.$ = $;
  this.tripElement = tripElement;
  this.searchData = searchData;
  this.doc = this.tripElement.ownerDocument;
  this.controller = new TripController(this.$, this);
  this.footprintView = new BingTripFootprintView(this.$, this.tripElement);
  this.infoView = new BingTripInfoView(this.$, this.footprintView.footprintParent());
};
BingTrip.prototype = new Trip();

BingTrip.events = {
  tripDetailsSuccess: function(trip, success) {
    return function(result) {
      var div = trip.$('<div />');
      div.addClass('careplane-trip-details');
      div.html(result.message);
      div.css('display', 'none');
      trip.$(trip.tripElement).append(div);

      trip.flights = BingFlight.parse(trip.$, trip.$('.inlineflightitinerarylegs tr', trip.tripElement));
      success(trip);
    };
  }
};

BingTrip.prototype.cost = function() {
  if(!this._cost) {
    this._cost = jsonpath.eval(this.searchData[0],
        '$.quotes[?(@.pricing.signature == "' + this.pricingSignature() + '")].pricing.price')[0];
  }
  return this._cost;
};

BingTrip.prototype.tripDetailsContainer = function() {
  if(!this._tripDetailsContainer)
    this._tripDetailsContainer = this.tripElement.getElementsByClassName('careplane-trip-details')[0];

  return this._tripDetailsContainer;
};

BingTrip.prototype.searchIdentifier = function() {
  var form = this.doc.forms[0];
  if(form) {
    return form.elements.namedItem('originsid').value;
  }
};

BingTrip.prototype.pricingSignature = function() {
  if(!this._pricingSignature) {
    var a = this.$('a[href*=requestId]');
    var href = a.attr('href');
    var matches = href.match(/signature=([^&]+)/);
    this._pricingSignature = matches[1];
  }
  
  return this._pricingSignature;
};

BingTrip.prototype.loadFlights = function(success) {
  this.flights = BingFlight.parse(this.searchData, this.pricingSignature());
  success(this);
};

module.exports = BingTrip;
