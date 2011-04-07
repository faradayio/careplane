var Careplane = {
  onLoad: function() {
    this.initialized = true;
    this.drivers = [Kayak, Orbitz];
    this.strings = document.getElementById("careplane-strings");
    this.prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.careplane.");
    var appcontent = document.getElementById("appcontent");   // browser
    if(appcontent)
      appcontent.addEventListener("DOMContentLoaded", this.onPageLoad, true);
  },

  brighterPlanetKey: '423120471f5c355512049b4532b2332f',

  onPageLoad: function(ev) {
    var doc = ev.originalTarget;
    var matchingDrivers = Careplane.drivers.filter(function(driver) {
      return Careplane.prefs.getBoolPref(driver.name.toLowerCase()) && driver.shouldMonitor(doc.location.href);
    });
    if (matchingDrivers.length > 0) {
      var matchingDriver = new matchingDrivers[0](doc);
      matchingDriver.load();
    }
  },
  
  standardTextAttribution: 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>',
  
  insertBadge: function(doc, parentElement, referenceElement, badgeStyle) {
    var styleElement = doc.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    styleElement.innerHTML = '.brighter_planet_cm1_badge { ' + badgeStyle + ' }';
    parentElement.insertBefore(styleElement, referenceElement);
    var brandingElement = doc.createElement('script');
    brandingElement.setAttribute('src', 'http://carbon.brighterplanet.com/badge.js');
    brandingElement.setAttribute('type', 'text/javascript');
    parentElement.insertBefore(brandingElement, referenceElement);
  },
  
  notify: function(driver) {
    var nb = gBrowser.getNotificationBox();
    var n = nb.getNotificationWithValue('careplane');
    var message = 'Careplane is calculating the carbon footprint of your ' + driver.name + ' flight search results.'; 
    if(n) {
        n.label = message;
    } else {
        const priority = nb.PRIORITY_INFO_LOW;
        nb.appendNotification(message, 'careplane', null, priority, [{accessKey: 'H', callback: Careplane.hideEmissionEstimates, label: 'Hide footprints'}]);
    }
  },
  
  fetch: function(url, callback, matcher, tries) {
    var xhr = new XMLHttpRequest();
    //if(!tries)
      //tries = 0;

    //var requestTimer = setTimeout(function() {
      //if(tries++ <= 3) {
        ////Careplane.log('Timeout! Trying ' + url + ' again');
        //Careplane.fetch(url, callback, matcher, tries);
      //}
    //}, 5000);
    //xhr.onreadystatechange = function() {
      //if(xhr.readyState == 2) {
        ////Careplane.log('Clearing timeout for ' + url);
        //clearTimeout(requestTimer);
      //}
    //};
    //xhr.addEventListener('error', function() {
      //clearTimeout(requestTimer);
    //}, false);
    xhr.addEventListener('load', function() {
      //clearTimeout(requestTimer);
      if(xhr.status==200) {
        var response = xhr.responseText;
        //Careplane.log('Response for ' + url + ': ' + response);
        var keyDetail = ((matcher) ? response.match(matcher)[1] : false);
        callback(response, keyDetail);
      };
    }, false);
    xhr.open('GET', url, true);
    xhr.overrideMimeType('text/xml');
    xhr.send(null);
  },
  
  formatFootprint: function(footprint) {
    var roundedFootprint = Math.round((footprint * 2.2) * 10) / 10;
    var delimitedFootprint = Careplane.numberWithDelimiter(roundedFootprint);
    var labeledFootprint = delimitedFootprint + ' lbs CO<sub>2</sub>e';
    return labeledFootprint;
  },
  
  numberWithDelimiter: function(number) { // hat tip http://kevinvaldek.com/number-with-delimiter-in-javascript
    number = number + '', delimiter = ',';
    var split = number.split('.');
    split[0] = split[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + delimiter);
    return split.join('.');
  },

  logger: Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService),

  log: function(str) {
    Careplane.logger.logStringMessage(str);
  }
};
