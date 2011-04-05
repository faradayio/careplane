beforeEach(function() {
  this.addMatchers({
    toBeInstanceOf: function(klass) {
      return typeof this.actual == klass;
    }
  });
  Careplane.webDoc = window.document;
  Careplane.log = jasmine.log;
});
