Util = {
  fetch: function(url, callback) {
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
        callback(response);
      };
    }, false);
    xhr.open('GET', url, true);
    xhr.overrideMimeType('text/xml');
    xhr.send(null);
  },
  
  formatFootprint: function(footprint) {
    var roundedFootprint = Math.round((footprint * 2.2) * 10) / 10;
    var delimitedFootprint = Util.numberWithDelimiter(roundedFootprint);
    var labeledFootprint = delimitedFootprint + ' lbs CO<sub>2</sub>e';
    return labeledFootprint;
  },

  footprintAnalysis: function(average, current) {
    var diff = average - current;
    var differentialInCarDays = Util.numberWithDelimiter(Math.abs(diff) / 30.6356);
    var result;
    if(current < average) {
      result = 'Flying this trip instead would be like taking ' + differentialInCarDays + ' cars off the road for a day';
    } else if(current == average) {
      result = 'This is an average flight';
    } else {
      result = 'Flying this trip instead would be like adding ' + differentialInCarDays + ' cars to the road for a day';
    }
    return result;
  },
  
  numberWithDelimiter: function(number) { // hat tip http://kevinvaldek.com/number-with-delimiter-in-javascript
    number = number + '', delimiter = ',';
    var split = number.split('.');
    split[0] = split[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + delimiter);
    return split.join('.');
  },

  proxy: function(func, reprsentedParty) {
    return function() {
      return func.apply(reprsentedParty, arguments);
    };
  },

  setTextChild: function(parentElement, text) {
    if(parentElement.firstChild)
      parentElement.removeChild(parentElement.firstChild);
    var txt = document.createTextNode(text);
    parentElement.appendChild(txt);
  }
};
