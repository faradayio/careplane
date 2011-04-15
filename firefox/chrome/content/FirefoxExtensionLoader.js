FirefoxExtensionLoader = {
  load: function(ev) {
    var extension = new FirefoxExtension(ev.originalTarget);
    extension.welcome();
    extension.loadDriver();
  }
};
