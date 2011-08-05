describe('Orbitz', function() {
  var Orbitz = require('drivers/Orbitz');

  beforeEach(function() {
    this.driverClass = Orbitz;
  });

  itBehavesLikeA('non-polling Driver');
});
