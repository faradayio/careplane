var pageMod = require('page-mod');
var workers = require('./browser/firefox/FirefoxWorker');
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
      'sites.Bing': panelWorker.getPreference({ key: 'sites.Bing', defaultValue: true }), 
      'sites.Hipmunk': panelWorker.getPreference({ key: 'sites.Hipmunk', defaultValue: true }), 
      'sites.Kayak': panelWorker.getPreference({ key: 'sites.Kayak', defaultValue: true }), 
      'sites.KayakUK': panelWorker.getPreference({ key: 'sites.KayakUK', defaultValue: true }), 
      'sites.Orbitz': panelWorker.getPreference({ key: 'sites.Orbitz', defaultValue: true }), 
    });
  }
});

panelWorker = new workers.FirefoxPanelWorker(careplanePanel);
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
    include: /.*bing\.com\/travel\/flight\/flightSearch/,
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('application.js'),
    onAttach: function(addon) {
      modWorker = new workers.FirefoxModWorker(addon, careplanePanel);
      modWorker.init('Bing');
    }
  });

  
  
  
  pageMod.PageMod({
    include: /.*hipmunk\.com.*/,
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('application.js'),
    onAttach: function(addon) {
      modWorker = new workers.FirefoxModWorker(addon, careplanePanel);
      modWorker.init('Hipmunk');
    }
  });

  
  
  
  pageMod.PageMod({
    include: /.*kayak\.com.*/,
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('application.js'),
    onAttach: function(addon) {
      modWorker = new workers.FirefoxModWorker(addon, careplanePanel);
      modWorker.init('Kayak');
    }
  });

  
  
  
  pageMod.PageMod({
    include: /.*kayak\.co\.uk.*/,
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('application.js'),
    onAttach: function(addon) {
      modWorker = new workers.FirefoxModWorker(addon, careplanePanel);
      modWorker.init('KayakUK');
    }
  });

  
  
  
  pageMod.PageMod({
    include: /orbitz\.com\/App\/ViewFlightSearchResults/,
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('application.js'),
    onAttach: function(addon) {
      modWorker = new workers.FirefoxModWorker(addon, careplanePanel);
      modWorker.init('Orbitz');
    }
  });

