describe('Util', function() {
  describe('proxy', function() {
    var myfunc = function() {
      return 'oh, ' + this.boogla;
    };

    it('returns a function', function() {
      expect(typeof Util.proxy(myfunc, this)).toBe('function');
    });
    it('executes the function in the context of the target object', function() {
      var oogla = function() {
        this.boogla = 'ok';
      }

      var ooglance = new oogla();
      var prox = Util.proxy(myfunc, ooglance);

      expect(prox()).toBe('oh, ok');
    });
    it('passes arguments to the proxied function', function() {
      var output = function(myarg) {
        return 'got ' + myarg + '?';
      };

      var prox = Util.proxy(output, this);

      expect(prox('milk')).toBe('got milk?');
    });
  });
});
