Overlay = {
  onLoad: function() {
    var browser = document.getElementById("appcontent");
    if(browser) {
      browser.addEventListener("DOMContentLoaded", FirefoxExtensionLoader.load, true);
    }
  },
};

window.addEventListener("load", Overlay.onLoad, false);
