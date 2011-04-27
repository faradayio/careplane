TestExtension = function(doc) {
  this.doc = doc;
  this.klass = TestExtension;
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
  jasmine.log(str);
};

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
