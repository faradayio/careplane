Overlay = {
  onLoad: function() {
    var appcontent = document.getElementById("appcontent");
    if(appcontent) {
      var extension = new FirefoxExtension();
      appcontent.addEventListener("DOMContentLoaded", Util.proxy(extension.onPageLoad, extension), true);
    }
  },
};

window.addEventListener("load", Overlay.onLoad, false);
