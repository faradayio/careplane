var pageMod = require('page-mod');
var careplaneWorker = require('Worker');
var data = require("self").data;

pageMod.PageMod({
  include: /.*hipmunk.com.*/,
  contentScriptWhen: 'ready',
  contentScriptFile: [
    data.url('lib/jquery-1.5.2.min.js'),
    data.url('Preferences.js'),
    data.url('Util.js'),
    data.url('CareplaneTrackerService.js'),
    data.url('Tracker.js'),
    data.url('Driver.js'),
    data.url('HallOfFame.js'),
    data.url('Flight.js'),
    data.url('Trip.js'),
    data.url('AverageTrip.js'),
    data.url('AirTrafficController.js'),
    data.url('controllers/TripController.js'),
    data.url('views/TripInfoView.js'),
    data.url('views/TripFootprintView.js'),
    data.url('Careplane.js'),
    data.url('drivers/Hipmunk.js'),
    data.url('drivers/Hipmunk/HipmunkAirTrafficController.js'),
    data.url('drivers/Hipmunk/HipmunkFlight.js'),
    data.url('drivers/Hipmunk/HipmunkTrip.js'),
    data.url('drivers/Hipmunk/HipmunkTripController.js'),
    data.url('views/Hipmunk/HipmunkTripEmbeddedInfoView.js'),
    data.url('views/Hipmunk/HipmunkTripFootprintView.js'),
    data.url('views/Hipmunk/HipmunkTripInfoView.js'),
    data.url('browser/firefox/FirefoxExtension.js'),
    data.url('browser/firefox/FirefoxExtensionLoader.js'),
  ],
  onAttach: function(addon) {
    var worker = new careplaneWorker.firefox(addon, 'Hipmunk');
    worker.init();
  }
});

pageMod.PageMod({
  include: /.*kayak.com.*/,
  contentScriptWhen: 'ready',
  contentScriptFile: [
    data.url('lib/jquery-1.5.2.min.js'),
    data.url('Preferences.js'),
    data.url('Util.js'),
    data.url('CareplaneTrackerService.js'),
    data.url('Tracker.js'),
    data.url('Driver.js'),
    data.url('HallOfFame.js'),
    data.url('Flight.js'),
    data.url('Trip.js'),
    data.url('AverageTrip.js'),
    data.url('AirTrafficController.js'),
    data.url('controllers/TripController.js'),
    data.url('views/TripInfoView.js'),
    data.url('views/TripFootprintView.js'),
    data.url('Careplane.js'),
    data.url('drivers/Kayak.js'),
    data.url('drivers/Kayak/KayakAirTrafficController.js'),
    data.url('drivers/Kayak/KayakFlight.js'),
    data.url('drivers/Kayak/KayakTrip.js'),
    data.url('views/Kayak/KayakTripFootprintView.js'),
    data.url('views/Kayak/KayakTripInfoView.js'),
    data.url('browser/firefox/FirefoxExtension.js'),
    data.url('browser/firefox/FirefoxExtensionLoader.js'),
  ],
  onAttach: function(addon) {
    var worker = new careplaneWorker.firefox(addon, 'Kayak');
    worker.init();
  }
});

pageMod.PageMod({
  include: /.*orbitz.com.*/,
  contentScriptWhen: 'ready',
  contentScriptFile: [
    data.url('lib/jquery-1.5.2.min.js'),
    data.url('Preferences.js'),
    data.url('Util.js'),
    data.url('CareplaneTrackerService.js'),
    data.url('Tracker.js'),
    data.url('Driver.js'),
    data.url('HallOfFame.js'),
    data.url('Flight.js'),
    data.url('Trip.js'),
    data.url('AverageTrip.js'),
    data.url('AirTrafficController.js'),
    data.url('controllers/TripController.js'),
    data.url('views/TripInfoView.js'),
    data.url('views/TripFootprintView.js'),
    data.url('Careplane.js'),
    data.url('drivers/Orbitz.js'),
    data.url('drivers/Orbitz/OrbitzAirTrafficController.js'),
    data.url('drivers/Orbitz/OrbitzFlight.js'),
    data.url('drivers/Orbitz/OrbitzTrip.js'),
    data.url('views/Orbitz/OrbitzTripFootprintView.js'),
    data.url('views/Orbitz/OrbitzTripInfoView.js'),
    data.url('browser/firefox/FirefoxExtension.js'),
    data.url('browser/firefox/FirefoxExtensionLoader.js'),
  ],
  onAttach: function(addon) {
    var worker = new careplaneWorker.firefox(addon, 'Orbitz');
    worker.init();
  }
});
