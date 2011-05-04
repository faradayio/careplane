Driver = function() {};

Driver.prototype.startAirTrafficControl = function() {
  this.controller = new this.controllerClass(this.doc);
  this.controller.clear();
};
