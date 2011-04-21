GoogleChromeExtensionLoader = ExtensionLoader;

GoogleChromeExtensionLoader.load = function() {
  var extension = new GoogleChromeExtension(window.document);
  extension.loadDriver(GoogleChromeExtensionLoader.driverLoaded(extension));
};
