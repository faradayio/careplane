Browserify = {};
process.env = { CM1_KEY: '423120471f5c355512049b4532b2332f' };

var SafariExtension = require('./browser/safari/safari-extension');
SafariExtension.load();

if(/hipmunk/.test(document.location.href)) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', safari.extension.baseURI + 'hipmunk-spy.js');
  document.head.appendChild(script);
}
