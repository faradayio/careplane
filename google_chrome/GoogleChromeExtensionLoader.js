GoogleChromeExtensionLoader = {
  load: function() {
    var extension = new GoogleChromeExtension(window.document);
    if(extension.isActive()) {
      extension.welcome();
      extension.loadDriver();
    }
  }
};
