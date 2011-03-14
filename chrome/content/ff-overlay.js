careplane.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ careplane.showFirefoxContextMenu(e); }, false);
};

careplane.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-careplane").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { careplane.onFirefoxLoad(); }, false);
