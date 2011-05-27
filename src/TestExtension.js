TestExtension = function(doc) {
  this.doc = doc;
  this.klass = TestExtension;
  this.tracker = {
    welcome: function() {},
    search: function() {},
    purchase: function() {},
    purchaseComparison: function() {}
  };
};
TestExtension.prototype = new Careplane();

TestExtension.urlMap = {};

TestExtension.fetch = function(url, callback) {
  for(var pattern in TestExtension.urlMap) {
    var regex = new RegExp(pattern);
    if(regex.test(url)) {
      callback(TestExtension.urlMap[pattern]);
      return;
    }
  }
  TestExtension.log("TestExtension.fetch doesn't know what to do with URL " + url);
};

TestExtension.log = function(str) {
  if(typeof jasmine != 'undefined') {
    jasmine.log(str);
  } else if(typeof capy != 'undefined') {
    capy.log(str);
  } else {
    throw 'Unable to log to anything';
  }
};

TestExtension.prefs = new TestPreferences();

TestExtension.prototype.isPollingEnabled = false;

TestExtension.prototype.fetch = function(url, callback) {
  TestExtension.fetch(url, callback);
};

TestExtension.prototype.log = function(str) {
  TestExtension.log(str);
};

TestExtension.prototype.welcome = function() {
  TestExtension.log('Welcome!');
};
  
TestExtension.prototype.notify = function(driver) {
  TestExtension.log('Careplane is calculating the carbon footprint of your ' + driver.driverName + ' flight search results.'); 
};

TestExtension.prototype.addStyleSheet = function() { /* NOOP */ };
