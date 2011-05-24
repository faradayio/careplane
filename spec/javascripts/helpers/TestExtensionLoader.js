TestExtensionLoader = ExtensionLoader;

TestExtensionLoader.load = function() {
  var extension = new TestExtension(window.document);
  extension.loadDriver(TestExtensionLoader.driverLoaded(extension));
};
