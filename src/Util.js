Util = {
  formatFootprint: function(footprint) {
    var roundedFootprint = Math.round((footprint * 2.2) * 10) / 10;
    var delimitedFootprint = Util.numberWithDelimiter(roundedFootprint);
    var labeledFootprint = delimitedFootprint + ' lbs CO<sub>2</sub>e';
    return labeledFootprint;
  },

  footprintAnalysis: function(average, current) {
    var diff = average - current;
    var differentialInCarDays = Math.round(Math.abs(diff) / 30.6356);
    var result;
    var car = differentialInCarDays > 1 ? 'cars' : 'car';
    if(differentialInCarDays == 0) {
      result = 'This is an average flight';
    } else if(current < average) {
      result = 'Choosing this trip over the average trip would be like <b>taking ' + differentialInCarDays + ' ' + car + ' off the road</b> for a day';
    } else {
      result = 'Choosing this trip over the average trip would be like <b>adding ' + differentialInCarDays + ' ' + car + ' to the road</b> for a day';
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

  urlFor: function(base, params) {
    var queryString = '?';
    for(var key in params) {
      if(params[key] != null) {
        if(queryString != '?')
          queryString += '&';
        queryString += key + '=' + params[key];
      }
    }
    return encodeURI(base + queryString);
  },
};
