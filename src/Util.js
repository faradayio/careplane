Util = {
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
    var delimitedFootprint = Util.numberWithDelimiter(roundedFootprint);
    var labeledFootprint = delimitedFootprint + ' lbs CO<sub>2</sub>e';
    return labeledFootprint;
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
  }
};
