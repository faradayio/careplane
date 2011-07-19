var pageMod = require('page-mod');
var careplaneWorker = require('Worker');
var data = require('self').data;
var Widget = require('widget').Widget;
var Panel = require('panel').Panel;

var widget, careplanePanel, panelWorker, modWorker;

careplanePanel = Panel({
  id: 'careplane-panel',
  contentURL: data.url('widget.html'),
  contentScriptFile: data.url('widget.js'),
  onShow: function() {
    careplanePanel.port.emit('preferences.load', {
      'sites.Kayak': panelWorker.getPreference({ key: 'sites.Kayak', defaultValue: true }),
      'sites.Hipmunk': panelWorker.getPreference({ key: 'sites.Hipmunk', defaultValue: true }),
      'sites.Orbitz': panelWorker.getPreference({ key: 'sites.Orbitz', defaultValue: true }),
    });
  }
});

panelWorker = new careplaneWorker.firefoxPanel(careplanePanel);
panelWorker.init();

widget = Widget({
  id: 'careplane-widget',
  label: 'Configure Careplane',
  panel: careplanePanel,
  contentURL: data.url('icon.png'),
  onClick: function() {
    careplanePanel.port.emit('info');
  }
});

pageMod.PageMod({
  include: /.*hipmunk.com.*/,
  contentScriptWhen: 'ready',
  contentScriptFile: [
    data.url('lib/jquery-1.5.2.min.js'),
    data.url('Preferences.js'),
    data.url('Util.js'),
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
    modWorker = new careplaneWorker.firefoxMod(addon, careplanePanel);
    modWorker.init('Hipmunk');
  }
});

pageMod.PageMod({
  include: /.*kayak.com.*/,
  contentScriptWhen: 'ready',
  contentScriptFile: [
    data.url('lib/jquery-1.5.2.min.js'),
    data.url('Preferences.js'),
    data.url('Util.js'),
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
    modWorker = new careplaneWorker.firefoxMod(addon, careplanePanel);
    modWorker.init('Kayak');
  }
});

pageMod.PageMod({
  include: /.*orbitz.com.*/,
  contentScriptWhen: 'ready',
  contentScriptFile: [
    data.url('lib/jquery-1.5.2.min.js'),
    data.url('Preferences.js'),
    data.url('Util.js'),
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
    modWorker = new careplaneWorker.firefoxMod(addon, careplanePanel);
    modWorker.init('Orbitz');
  }
});


