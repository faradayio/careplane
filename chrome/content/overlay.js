var careplane = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("careplane-strings");
  },
};

window.addEventListener("load", function () { careplane.onLoad(); }, false);
