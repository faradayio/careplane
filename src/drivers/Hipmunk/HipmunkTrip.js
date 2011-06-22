HipmunkTrip = function(tripElement) {
  this.tripElement = tripElement;
  this.id = tripElement.id;
  this.infoPanelElement = $('#' + this.infoPanelElementId(),
                            this.tripElement.ownerDocument).get(0);
  this.controller = new HipmunkTripController(this);
  this.footprintView = new HipmunkTripFootprintView(this.tripElement);
};
HipmunkTrip.prototype = new Trip();

HipmunkTrip.prototype.infoPanelElementId = function() {
  return this.tripElement.id.
    replace(/routing(-[^-]+).*$/,"info-panel$1");
};

HipmunkTrip.prototype.cost = function() {
  if(!this._cost)
    this._cost = parseInt($('.price', this.tripElement).text().match(/\d+/)[0]);

  return this._cost;
};

HipmunkTrip.prototype.isValid = function() {
  return this.footprintView.isValid() && this.infoPanelElement;
};

HipmunkTrip.prototype.footprintParent = function() {
  return $('.graph', this.tripElement).get(0);
};

HipmunkTrip.prototype.infoView = function() {
  if(!this._infoView) {
    this._infoView = new HipmunkTripInfoView(this.tripElement);
  }
  return this._infoView;
};

HipmunkTrip.prototype.embeddedInfoView = function() {
  if(!this._embeddedInfoView && this.infoPanelElement) {
    this._embeddedInfoView = new HipmunkTripEmbeddedInfoView(this.infoPanelElement);
  }
  return this._embeddedInfoView;
};

HipmunkTrip.prototype.flights = function() {
  if(!this._flights || this._flights.length == 0) {
    var legs = $('.details-padding', this.infoPanelElement);
    this._flights = [];
    var trip = this;
    $(legs).each(function(i, leg) {
      trip._flights.push(HipmunkFlight.parse(leg));
    });
  }
  return this._flights;
}

HipmunkTrip.prototype.initViews = function() {
  this.footprintView.init();
  this.infoView().init();
  if(this.embeddedInfoView())
    this.embeddedInfoView().init();
};
