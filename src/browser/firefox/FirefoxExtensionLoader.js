FirefoxExtensionLoader = ExtensionLoader;

var extension = new FirefoxExtension(document);
extension.loadDriver(FirefoxExtensionLoader.driverLoaded(extension));
