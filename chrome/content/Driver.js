Driver = function() {};

Driver.prototype.hideEmissionEstimates = function() {
  Array.prototype.slice.
    call(this.doc.getElementsByClassName('careplane-footprint')).
    forEach(function(el) { el.setAttribute('style', 'display: none'); });
};
