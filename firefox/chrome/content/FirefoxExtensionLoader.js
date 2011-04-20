FirefoxExtensionLoader = {
  load: function(ev) {
    var extension = new FirefoxExtension(ev.originalTarget);
    if(extension.isActive()) {
      Careplane.setCurrentExtension(extension);
      extension.welcome();
      extension.loadDriver();
    }
  }
};
