Overlay = {
  onLoad: function() {
    var appcontent = document.getElementById("appcontent");
    if(appcontent) {
      var extension = new FirefoxExtension();
      appcontent.addEventListener("DOMContentLoaded", extension.onPageLoad(), true);
    }
  },
};

window.addEventListener("load", Overlay.onLoad, false);
