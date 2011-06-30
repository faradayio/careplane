FirefoxExtensionLoader = {
  load: function(ev) {
    var extension = new FirefoxExtension(ev.originalTarget);
    extension.loadDriver();
  }
};
