Browserify = {};
process.env = { CM1_KEY: '423120471f5c355512049b4532b2332f' };

var SafariExtension = require('./browser/safari/safari-extension');
SafariExtension.load();
