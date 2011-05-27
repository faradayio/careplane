describe('Hipmunk', function() {
  beforeEach(function() {
    this.driverClass = Hipmunk;
  });

  it('has a .driverName', function() {
    expect(Hipmunk.driverName).toBe('Hipmunk');
  });

  itBehavesLikeA('polling Driver');
});
