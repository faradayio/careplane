GoogleChromeExtensionLoader = {
  load: function() {
    var extension = new GoogleChromeExtension(window.document);
    if(extension.isActive()) {
      Careplane.setCurrentExtension(extension);
      extension.welcome();
      extension.loadDriver();
    }
  }
};
