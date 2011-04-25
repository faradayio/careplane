GoogleChromeExtensionLoader.load();

GoogleChromeExtensionListener = {
  dispatch: function(request, sender, sendResponse) {
    switch(request.action) {
    case 'hide': 
      CareplaneEvents.hideEmissionEstimates();
      break;
    }
  },
}

chrome.extension.onRequest.addListener(GoogleChromeExtensionListener.dispatch);
