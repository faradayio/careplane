ExtensionLoader = {
  driverLoaded: function(extension) {
    return function() {
      Careplane.setCurrentExtension(extension);
      extension.welcome();
    };
  }
};
