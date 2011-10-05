var CareplaneTrackerService = require('./careplane-tracker-service');
var GoogleChromeWorker = require('./browser/google_chrome/google-chrome-worker');

var worker = new GoogleChromeWorker();
worker.init();
