FirefoxExtensionLoader = {
  load: function(ev) {
    var extension = new FirefoxExtension(ev.originalTarget);
    if(extension.isActive()) {
      extension.welcome();
      extension.loadDriver();
    }
  }
};
