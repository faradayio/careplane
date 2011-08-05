var CucumberExtension = require('./browser/cucumber/CucumberExtension');

var extension = new CucumberExtension(window.document);
extension.prefs.putBoolean('hasRunPreviously', true);
extension.prefs.putBoolean('sites.Bing', true);
extension.prefs.putBoolean('sites.Kayak', true);
extension.prefs.putBoolean('sites.KayakUK', true);
extension.prefs.putBoolean('sites.Orbitz', true);
extension.prefs.putBoolean('sites.Hipmunk', true);
extension.loadDriver();
