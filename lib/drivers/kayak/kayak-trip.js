var Util = require('../../util');

var KayakFlight = require('./kayak-flight'),
    KayakTripFootprintView = require('../../views/kayak/kayak-trip-footprint-view'),
    KayakTripInfoView = require('../../views/kayak/kayak-trip-info-view'),
    Trip = require('../../trip'),
    TripController = require('../../controllers/trip-controller');

var KayakTrip = function(id, $, tripElement) {
  this.id = id;
  this.$ = $;
  this.tripElement = tripElement;
  this.detailHost = 'www.kayak.com';
};
KayakTrip.prototype = new Trip();

KayakTrip.prototype.init = function() {
  this.doc = this.tripElement.ownerDocument;
  this.controller = new TripController(this);
  this.footprintView = new KayakTripFootprintView(this.tripElement);
  this.infoView = new KayakTripInfoView(this.tripElement);

  var form = this.doc.forms[0];
  if(form)
    this.searchIdentifier = form.elements.namedItem('originsid').value;

  this.resultIdentifier = this.$(this.tripElement).attr('data-resultid');

  Trip.prototype.init.apply(this);
};

KayakTrip.events = {
  tripDetailsSuccess: function(trip, success) {
    return function(response) {
      var result = JSON.parse(response);
      var div = this.$(trip.doc.createElement('div'));
      div.addClass('careplane-trip-details');
      div.html(result.message);
      div.css('display', 'none');
      this.$(trip.tripElement).append(div);

      trip.flights = KayakFlight.parse(this.$('.inlineflightitinerarylegs tr', trip.tripElement));
      success(trip);
    };
  }
};

KayakTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt(this.$('#priceAnchor' + this.id, this.tripElement).text().replace(/[^0-9]/g,''));

  return this._cost;
};

KayakTrip.prototype.tripDetailsContainer = function() {
  if(!this._tripDetailsContainer)
    this._tripDetailsContainer = this.tripElement.getElementsByClassName('careplane-trip-details')[0];

  return this._tripDetailsContainer;
};

KayakTrip.prototype.detailUrl = function() {
  return 'http://' + this.detailHost + '/s/run/inlineDetails/flight?searchid=' + this.searchIdentifier + '&resultid=' + this.resultIdentifier + '&localidx=' + this.id + '&fs=;';
};

KayakTrip.prototype.loadFlights = function(success) {
  Util.fetch(this.detailUrl(), 
    KayakTrip.events.tripDetailsSuccess(this, success));
};

module.exports = KayakTrip;
