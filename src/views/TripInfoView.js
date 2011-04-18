TripInfoView = function(tripElement) {
  this.tripElement = tripElement;
  this.doc = this.tripElement.ownerDocument;
};

TripInfoView.prototype.target = function() {
  return this.tripElement.getElementsByClassName('careplane-info')[0];
};

TripInfoView.prototype.init = function() {
  //<div class="careplane-info">
  //  Search average: <span class="careplane-search-average"></span>
  //  <ul class="careplane-methodologies"></ul>
  //</div>

  var careplaneInfoDiv = this.doc.createElement('div');
  careplaneInfoDiv.setAttribute('class', 'careplane-info');
  careplaneInfoDiv.appendChild(this.doc.createTextNode('Search average:'));

  var careplaneSearchAverage = this.doc.createElement('span');
  careplaneSearchAverage.setAttribute('class', 'careplane-search-average');
  careplaneInfoDiv.appendChild(careplaneSearchAverage);

  var careplaneMethodologies = this.doc.createElement('ul');
  careplaneMethodologies.setAttribute('class', 'careplane-methodologies');
  careplaneInfoDiv.appendChild(careplaneMethodologies);

  this.tripElement.appendChild(careplaneInfoDiv);
};

TripInfoView.prototype.updateSearchAverage = function(average) {
  var span = this.target().getElementsByClassName('careplane-search-average')[0];
  span.innerHTML = Util.formatFootprint(average);
};

TripInfoView.prototype.reportFlightMethodology = function(methodologyUrl, flight) {
  var ul = this.target().getElementsByClassName('careplane-methodologies')[0];
  var li = this.doc.createElement('li');
  var a = this.doc.createElement('a');
  a.setAttribute('href', methodologyUrl);
  a.appendChild(this.doc.createTextNode('Methodology for ' + flight.origin + '-' + flight.destination));
  li.appendChild(a);
  ul.appendChild(li);
};

TripInfoView.prototype.show = function() {
  this.target().style.setAttribute('visibility','visible');
};
TripInfoView.prototype.hide = function() {
  this.target().style.setAttribute('visibility','hidden');
};
