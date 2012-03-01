var Driver = function() {};

Driver.prototype.events = {
  loadPoller: function(driver) {
    return function() {
      if(driver.isActiveSearch()) {
        driver.prepare();
        driver.atc.poll();
        clearInterval(driver.loadInterval);
      }
    };
  }
};

Driver.prototype.driverName = function() {
  return this.klass.driverName;
};

Driver.prototype.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';

Driver.prototype.isActiveSearch = function() {
  return this.$(this.waitForElement)[0] != null;
};

Driver.prototype.prepare = function() {
  if(this.extension.notify)
    this.extension.notify(this);
  if(this.extension.addStyleSheet)
    this.extension.addStyleSheet();
  if(this.insertAttribution)
    this.insertAttribution();
};

Driver.prototype.load = function() {
  this.loadInterval = setInterval(this.events.loadPoller(this), 500);
};
  
Driver.prototype.insertBadge = function(parentElement, referenceElement, className) {
  var badgeElement, badge = '<div class="brighter_planet_cm1_badge"><p><a href="http://brighterplanet.com"><span class="setup">Carbon powered by</span> <span class="punchline">Brighter Planet</span></a></p></div>';

  if(referenceElement) {
    badgeElement = this.$(referenceElement).prepend(badge);
  } else {
    badgeElement = this.$(parentElement).append(badge);
  }

  if(className) badgeElement.addClass(className);
};

module.exports = Driver;
