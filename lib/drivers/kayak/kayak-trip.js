var $ = require('jquery');
var Trip = require('../../trip');
var TripController = require('../../controllers/trip-controller');
var KayakTripFootprintView = require('../../views/kayak/kayak-trip-footprint-view');
var KayakTripInfoView = require('../../views/kayak/kayak-trip-info-view');
var KayakFlight = require('./kayak-flight');

var KayakTrip = function(extension, id, tripElement) {
  this.extension = extension;
  this.id = id;
  if(tripElement) {
    this.tripElement = tripElement;
    this.doc = this.tripElement.ownerDocument;
    this.controller = new TripController(this);
    this.footprintView = new KayakTripFootprintView(this.tripElement);
    this.infoView = new KayakTripInfoView(this.tripElement);
  }
};
KayakTrip.prototype = new Trip();

KayakTrip.events = {
  tripDetailsSuccess: function(trip, success) {
    return function(result) {
      var div = $(trip.doc.createElement('div'));
      div.addClass('careplane-trip-details');
      div.html(result.message);
      div.css('display', 'none');
      $(trip.tripElement).append(div);

      trip.flights = KayakFlight.parse(trip.extension, $('.inlineflightitinerarylegs tr', trip.tripElement));
      success(trip);
    };
  }
};

KayakTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt($('#priceAnchor' + this.id, this.tripElement).text().replace(/[^0-9]/g,''));

  return this._cost;
};

KayakTrip.prototype.tripDetailsContainer = function() {
  if(!this._tripDetailsContainer)
    this._tripDetailsContainer = this.tripElement.getElementsByClassName('careplane-trip-details')[0];

  return this._tripDetailsContainer;
};

KayakTrip.prototype.searchIdentifier = function() {
  var form = this.tripElement.ownerDocument.forms[0];
  if(form) {
    return form.elements.namedItem('originsid').value;
  }
};

KayakTrip.prototype.resultIdentifier = function() {
  return this.doc.getElementById('resultid' + this.id).innerHTML;
};

KayakTrip.prototype.detailUrl = function() {
  return 'http://www.kayak.com/s/run/inlineDetails/flight?searchid=' + this.searchIdentifier() + '&resultid=' + this.resultIdentifier() + '&localidx=' + this.id + '&fs=;';
};

KayakTrip.prototype.loadFlights = function(success) {
  this.extension.fetch(this.detailUrl(), KayakTrip.events.tripDetailsSuccess(this, success));
};

module.exports = KayakTrip;
