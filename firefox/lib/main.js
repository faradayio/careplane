var pageMod = require('page-mod');
var careplaneWorker = require('Worker');
var data = require('self').data;
var Widget = require('widget').Widget;
var Panel = require('panel').Panel;

var Careplane = require('Careplane').Careplane;

var widget, careplanePanel, panelWorker, modWorker;

careplanePanel = Panel({
  id: 'careplane-panel',
  contentURL: data.url('widget.html'),
  contentScriptFile: data.url('widget.js'),
  onShow: function() {
    careplanePanel.port.emit('preferences.load', {
      'sites.Bing': panelWorker.getPreference({ key: 'sites.Bing', defaultValue: true }), 
      'sites.Hipmunk': panelWorker.getPreference({ key: 'sites.Hipmunk', defaultValue: true }), 
      'sites.Kayak': panelWorker.getPreference({ key: 'sites.Kayak', defaultValue: true }), 
      'sites.KayakUK': panelWorker.getPreference({ key: 'sites.KayakUK', defaultValue: true }), 
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


  var Bing = require('drivers/Bing').Bing;
  
  
  pageMod.PageMod({
    include: Bing.monitorURL,
    contentScriptWhen: 'ready',
    contentScriptFile: [
      data.url('lib/node_modules.js'),
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
      data.url('drivers/Bing.js'),
      data.url('drivers/Bing/BingAirTrafficController.js'),
      data.url('drivers/Bing/BingFlight.js'),
      data.url('drivers/Bing/BingTrip.js'),
      data.url('views/Bing/BingTripFootprintView.js'),
      data.url('views/Bing/BingTripInfoView.js'),
      data.url('browser/firefox/FirefoxExtension.js'),
      data.url('browser/firefox/FirefoxTracker.js'),
    ],
    contentScript: '(new FirefoxExtension(document)).loadDriver();',
    onAttach: function(addon) {
      modWorker = new careplaneWorker.firefoxMod(addon, careplanePanel);
      modWorker.init('Bing');
    }
  });

  var Hipmunk = require('drivers/Hipmunk').Hipmunk;
  
  
  pageMod.PageMod({
    include: Hipmunk.monitorURL,
    contentScriptWhen: 'ready',
    contentScriptFile: [
      data.url('lib/node_modules.js'),
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
      data.url('browser/firefox/FirefoxTracker.js'),
    ],
    contentScript: '(new FirefoxExtension(document)).loadDriver();',
    onAttach: function(addon) {
      modWorker = new careplaneWorker.firefoxMod(addon, careplanePanel);
      modWorker.init('Hipmunk');
    }
  });

  var Kayak = require('drivers/Kayak').Kayak;
  
  
  pageMod.PageMod({
    include: Kayak.monitorURL,
    contentScriptWhen: 'ready',
    contentScriptFile: [
      data.url('lib/node_modules.js'),
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
      data.url('browser/firefox/FirefoxTracker.js'),
    ],
    contentScript: '(new FirefoxExtension(document)).loadDriver();',
    onAttach: function(addon) {
      modWorker = new careplaneWorker.firefoxMod(addon, careplanePanel);
      modWorker.init('Kayak');
    }
  });

  var KayakUK = require('drivers/KayakUK').KayakUK;
  
  
  pageMod.PageMod({
    include: KayakUK.monitorURL,
    contentScriptWhen: 'ready',
    contentScriptFile: [
      data.url('lib/node_modules.js'),
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
      data.url('browser/firefox/FirefoxTracker.js'),
      data.url('lib/node_modules.js'),
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
      data.url('drivers/KayakUK.js'),
      data.url('drivers/KayakUK/KayakUKAirTrafficController.js'),
      data.url('drivers/KayakUK/KayakUKTrip.js'),
      data.url('views/KayakUK/KayakUKTripFootprintView.js'),
      data.url('drivers/Kayak.js'),
      data.url('drivers/Kayak/KayakAirTrafficController.js'),
      data.url('drivers/Kayak/KayakFlight.js'),
      data.url('drivers/Kayak/KayakTrip.js'),
      data.url('views/Kayak/KayakTripFootprintView.js'),
      data.url('views/Kayak/KayakTripInfoView.js'),
      data.url('browser/firefox/FirefoxExtension.js'),
      data.url('browser/firefox/FirefoxTracker.js'),
    ],
    contentScript: '(new FirefoxExtension(document)).loadDriver();',
    onAttach: function(addon) {
      modWorker = new careplaneWorker.firefoxMod(addon, careplanePanel);
      modWorker.init('KayakUK');
    }
  });

  var Orbitz = require('drivers/Orbitz').Orbitz;
  
  
  pageMod.PageMod({
    include: Orbitz.monitorURL,
    contentScriptWhen: 'ready',
    contentScriptFile: [
      data.url('lib/node_modules.js'),
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
      data.url('browser/firefox/FirefoxTracker.js'),
    ],
    contentScript: '(new FirefoxExtension(document)).loadDriver();',
    onAttach: function(addon) {
      modWorker = new careplaneWorker.firefoxMod(addon, careplanePanel);
      modWorker.init('Orbitz');
    }
  });

