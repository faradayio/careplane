Components = {
  classes: {
    "@mozilla.org/consoleservice;1": {
      getService: function() { return { logStringMessage: function(str) { console.log(str); } }; }
    },
    "@mozilla.org/preferences-service;1": {
      getService: function() { return { getBranch: function() { return { getBoolPref: false }; } }; }
    }
  },
  interfaces: { 
    nsIPrefService: 'hi',
    nsIConsoleService: 'hi'
  }
};
