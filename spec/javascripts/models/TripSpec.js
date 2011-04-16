describe('Trip', function() {
  describe('#isAlreadyDiscovered', function() {
    it('returns true if a careplane footprint element exists', function() {
      var elem = document.createElement('div');
      var careplane = document.createElement('p');
      careplane.setAttribute('class', 'careplane-footprint');
      elem.appendChild(careplane);

      expect(Trip.isAlreadyDiscovered(elem)).toBeTruthy();
    });
    it('returns false if no careplane footprint element exists', function() {
      var elem = document.createElement('div');

      expect(Trip.isAlreadyDiscovered(elem)).toBeFalsy();
    });
  });
});
