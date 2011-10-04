describe('Orbitz', function() {
  var Orbitz = require('drivers/orbitz');

  beforeEach(function() {
    this.driverClass = Orbitz;
  });

  itBehavesLikeA('non-polling Driver');
});
