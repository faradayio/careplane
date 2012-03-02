if(!chrome || !chrome.extension) {
  var _ = require('underscore');

  var HipmunkDataParser = require('./hipmunk-data-parser');

  var tabCount = 0;

  var dataStore = document.createElement('div');
  dataStore.setAttribute('id', 'pilfered-hipmunk-data');
  dataStore.setAttribute('style', 'display: none;');
  document.body.appendChild(dataStore);

  var careplaneInterval = setInterval(function() {
    if($ && $.hipmunk) {
      var tabs = [];
      _.each($.hipmunk, function(tab) {
        if(tab.routings) {
          tabs.push(tab);
        }
      });

      if(tabs.length != tabCount) {
        var parser = new HipmunkDataParser(tabs, dataStore);
        parser.run();
        tabCount = tabs.length;
      }
    }
  }, 500);
}
