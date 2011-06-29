Util = {
  formatFootprint: function(footprint) {
    var roundedFootprint = Math.round((footprint * 2.2) * 10) / 10;
    var delimitedFootprint = Util.numberWithDelimiter(roundedFootprint);
    var labeledFootprint = delimitedFootprint + ' lbs CO<sub>2</sub>e';
    return labeledFootprint;
  },
  
  footprintComparison: function(average, current) {
    var diff = current - average;
    var change = Math.abs(diff) / average;
    var changePercentage = Math.round(change * 100);
    var result;
    if (diff < 0) {
      result = changePercentage + '% lower impact than average';
    } else if (diff > 0) {
      result = changePercentage + '% more impact than average';
    } else {
      result = 'Same impact as average';
    }
    return result;
  },

  footprintAnalysis: function(average, current) {
    var diff = average - current;
    var differentialInCarDays = Math.round(Math.abs(diff) / 30.6356);
    var result;
    var car = differentialInCarDays > 1 ? 'cars' : 'car';
    if(differentialInCarDays === 0) {
      result = 'This is an average flight';
    } else if(current < average) {
      result = 'Choosing this trip over the average trip would be like <b>taking ' + differentialInCarDays + ' ' + car + ' off the road</b> for a day';
    } else {
      result = 'Choosing this trip over the average trip would be like <b>adding ' + differentialInCarDays + ' ' + car + ' to the road</b> for a day';
    }
    return result;
  },
  
  numberWithDelimiter: function(number) { // hat tip http://kevinvaldek.com/number-with-delimiter-in-javascript
    number = number + '';
    delimiter = ',';
    var split = number.split('.');
    split[0] = split[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + delimiter);
    return split.join('.');
  },

  urlFor: function(base, params) {
    var queryString = '?';
    for(var key in params) {
      if(params[key] !== null) {
        if(queryString != '?')
          queryString += '&';
        queryString += key + '=' + params[key];
      }
    }
    return encodeURI(base + queryString);
  },

  mergeObjects: function() {
    var merger = arguments[1] || {};
    var newObject = arguments[0];
    for(var i in merger) {
      newObject[i] = merger[i];
    }
    return newObject;
  }
};
