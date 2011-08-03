var require = function (file, cwd) {
    var resolved = require.resolve(file, cwd || '/');
    var mod = require.modules[resolved];
    if (!mod) throw new Error(
        'Failed to resolve module ' + file + ', tried ' + resolved
    );
    var res = mod._cached ? mod._cached : mod();
    return res;
}
var __require = require;

require.paths = [];
require.modules = {};
require.extensions = [".js",".coffee"];

require.resolve = (function () {
    var core = {
        'assert': true,
        'events': true,
        'fs': true,
        'path': true,
        'vm': true
    };
    
    return function (x, cwd) {
        if (!cwd) cwd = '/';
        
        if (core[x]) return x;
        var path = require.modules.path();
        var y = cwd || '.';
        
        if (x.match(/^(?:\.\.?\/|\/)/)) {
            var m = loadAsFileSync(path.resolve(y, x))
                || loadAsDirectorySync(path.resolve(y, x));
            if (m) return m;
        }
        
        var n = loadNodeModulesSync(x, y);
        if (n) return n;
        
        throw new Error("Cannot find module '" + x + "'");
        
        function loadAsFileSync (x) {
            if (require.modules[x]) {
                return x;
            }
            
            for (var i = 0; i < require.extensions.length; i++) {
                var ext = require.extensions[i];
                if (require.modules[x + ext]) return x + ext;
            }
        }
        
        function loadAsDirectorySync (x) {
            x = x.replace(/\/+$/, '');
            var pkgfile = x + '/package.json';
            if (require.modules[pkgfile]) {
                var pkg = require.modules[pkgfile]();
                var b = pkg.browserify;
                if (typeof b === 'object' && b.main) {
                    var m = loadAsFileSync(path.resolve(x, b.main));
                    if (m) return m;
                }
                else if (typeof b === 'string') {
                    var m = loadAsFileSync(path.resolve(x, b));
                    if (m) return m;
                }
                else if (pkg.main) {
                    var m = loadAsFileSync(path.resolve(x, pkg.main));
                    if (m) return m;
                }
            }
            
            return loadAsFileSync(x + '/index');
        }
        
        function loadNodeModulesSync (x, start) {
            var dirs = nodeModulesPathsSync(start);
            for (var i = 0; i < dirs.length; i++) {
                var dir = dirs[i];
                var m = loadAsFileSync(dir + '/' + x);
                if (m) return m;
                var n = loadAsDirectorySync(dir + '/' + x);
                if (n) return n;
            }
            
            var m = loadAsFileSync(x);
            if (m) return m;
        }
        
        function nodeModulesPathsSync (start) {
            var parts;
            if (start === '/') parts = [ '' ];
            else parts = path.normalize(start).split('/');
            
            var dirs = [];
            for (var i = parts.length - 1; i >= 0; i--) {
                if (parts[i] === 'node_modules') continue;
                var dir = parts.slice(0, i + 1).join('/') + '/node_modules';
                dirs.push(dir);
            }
            
            return dirs;
        }
    };
})();

require.alias = function (from, to) {
    var path = require.modules.path();
    var res = null;
    try {
        res = require.resolve(from + '/package.json', '/');
    }
    catch (err) {
        res = require.resolve(from, '/');
    }
    var basedir = path.dirname(res);
    
    Object.keys(require.modules)
        .forEach(function (x) {
            if (x.slice(0, basedir.length + 1) === basedir + '/') {
                var f = x.slice(basedir.length);
                require.modules[to + f] = require.modules[basedir + f];
            }
            else if (x === basedir) {
                require.modules[to] = require.modules[basedir];
            }
        })
    ;
};

if (typeof process === 'undefined') process = {};

if (!process.nextTick) process.nextTick = function (fn) {
    setTimeout(fn, 0);
};

if (!process.title) process.title = 'browser';

if (!process.binding) process.binding = function (name) {
    if (name === 'evals') return require('vm')
    else throw new Error('No such module')
};

if (!process.cwd) process.cwd = function () { return '.' };

require.modules["path"] = function () {
    var module = { exports : {} };
    var exports = module.exports;
    var __dirname = ".";
    var __filename = "path";
    
    var require = function (file) {
        return __require(file, ".");
    };
    
    require.resolve = function (file) {
        return __require.resolve(name, ".");
    };
    
    require.modules = __require.modules;
    __require.modules["path"]._cached = module.exports;
    
    (function () {
        // resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
var resolvedPath = '',
    resolvedAbsolute = false;

for (var i = arguments.length; i >= -1 && !resolvedAbsolute; i--) {
  var path = (i >= 0)
      ? arguments[i]
      : process.cwd();

  // Skip empty and invalid entries
  if (typeof path !== 'string' || !path) {
    continue;
  }

  resolvedPath = path + '/' + resolvedPath;
  resolvedAbsolute = path.charAt(0) === '/';
}

// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)

// Normalize the path
resolvedPath = normalizeArray(resolvedPath.split('/').filter(function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.slice(-1) === '/';

// Normalize the path
path = normalizeArray(path.split('/').filter(function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  
  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(paths.filter(function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  var isWindows = false;
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};
;
    }).call(module.exports);
    
    __require.modules["path"]._cached = module.exports;
    return module.exports;
};

require.modules["/drivers/Hipmunk.js"] = function () {
    var module = { exports : {} };
    var exports = module.exports;
    var __dirname = "/drivers";
    var __filename = "/drivers/Hipmunk.js";
    
    var require = function (file) {
        return __require(file, "/drivers");
    };
    
    require.resolve = function (file) {
        return __require.resolve(name, "/drivers");
    };
    
    require.modules = __require.modules;
    __require.modules["/drivers/Hipmunk.js"]._cached = module.exports;
    
    (function () {
        var Driver = require('../Driver').Driver;

Hipmunk = function(extension) {
  this.klass = Hipmunk;
  this.extension = extension;
  this.doc = extension.doc;
  this.atc = new HipmunkAirTrafficController(this.doc);
};
Hipmunk.prototype = new Driver();

Hipmunk.driverName = 'Hipmunk';

Hipmunk.monitorURL = /.*hipmunk\.com.*/;

Hipmunk.prototype.waitForElement = '.info-panel';

if(typeof exports != 'undefined') {
  exports.Hipmunk = Hipmunk;
}
;
    }).call(module.exports);
    
    __require.modules["/drivers/Hipmunk.js"]._cached = module.exports;
    return module.exports;
};

require.modules["/Driver.js"] = function () {
    var module = { exports : {} };
    var exports = module.exports;
    var __dirname = "/";
    var __filename = "/Driver.js";
    
    var require = function (file) {
        return __require(file, "/");
    };
    
    require.resolve = function (file) {
        return __require.resolve(name, "/");
    };
    
    require.modules = __require.modules;
    __require.modules["/Driver.js"]._cached = module.exports;
    
    (function () {
        Driver = function() {};

Driver.prototype.events = {
  loadPoller: function(driver) {
    return function() {
      if(driver.isActiveSearch()) {
        driver.prepare();
        driver.atc.poll();
        clearInterval(driver.loadInterval);
      }
    };
  }
};

Driver.prototype.driverName = function() {
  return this.klass.driverName;
};

Driver.prototype.isPollingEnabled = function() {
  return this.extension.isPollingEnabled;
};

Driver.prototype.isActiveSearch = function() {
  return $(this.waitForElement, this.doc).get(0) !== null;
};

Driver.prototype.prepare = function() {
  if(this.extension.notify)
    this.extension.notify(this);
  if(this.extension.addStyleSheet)
    this.extension.addStyleSheet();
  if(this.insertAttribution)
    this.insertAttribution();
};

Driver.prototype.load = function() {
  if(this.isPollingEnabled()) {
    this.loadInterval = setInterval(this.events.loadPoller(this), 500);
  } else {
    this.prepare();
    this.atc.clear();
  }
};

if(typeof exports != 'undefined') {
  exports.Driver = Driver;
}
;
    }).call(module.exports);
    
    __require.modules["/Driver.js"]._cached = module.exports;
    return module.exports;
};

require.modules["/browser/test/TestPreferences.js"] = function () {
    var module = { exports : {} };
    var exports = module.exports;
    var __dirname = "/browser/test";
    var __filename = "/browser/test/TestPreferences.js";
    
    var require = function (file) {
        return __require(file, "/browser/test");
    };
    
    require.resolve = function (file) {
        return __require.resolve(name, "/browser/test");
    };
    
    require.modules = __require.modules;
    __require.modules["/browser/test/TestPreferences.js"]._cached = module.exports;
    
    (function () {
        var Preferences = require('../../Preferences').Preferences;

TestPreferences = function() {
  this.prefService = {};
  this.callbacks = [];
};
TestPreferences.prototype = new Preferences();

TestPreferences.prototype.nativeGet = function(key, callbackId, defaultValue) {
  this.callbacks[callbackId](this.prefService[key]);
};

TestPreferences.prototype.nativePut = function(key, value) {
  this.prefService[key] = value;
};
;
    }).call(module.exports);
    
    __require.modules["/browser/test/TestPreferences.js"]._cached = module.exports;
    return module.exports;
};

require.modules["/Preferences.js"] = function () {
    var module = { exports : {} };
    var exports = module.exports;
    var __dirname = "/";
    var __filename = "/Preferences.js";
    
    var require = function (file) {
        return __require(file, "/");
    };
    
    require.resolve = function (file) {
        return __require.resolve(name, "/");
    };
    
    require.modules = __require.modules;
    __require.modules["/Preferences.js"]._cached = module.exports;
    
    (function () {
        Preferences = function() {};

Preferences.events = {
  convertStringPreferenceToBoolean: function(callback) {
    return function(value) {
      callback((value === true || value == 'true'));
    };
  }
};

Preferences.prototype.executeCallback = function(id, val) {
  var callback = this.callbacks[id];
  callback(val);
};

Preferences.prototype.get = function(key, callback, defaultValue) {
  var callbackId = this.callbacks.length;
  this.callbacks.push(callback);
  this.nativeGet(key, callbackId, defaultValue);
};
Preferences.prototype.getBoolean = function(key, callback, defaultValue) {
  var callbackId = this.callbacks.length;
  this.callbacks.push(Preferences.events.convertStringPreferenceToBoolean(callback));
  this.nativeGet(key, callbackId, defaultValue);
};

Preferences.prototype.put = function(key, value) {
  this.nativePut(key, value);
  return value;
};
Preferences.prototype.putBoolean = Preferences.prototype.put;

exports.Preferences = Preferences;
;
    }).call(module.exports);
    
    __require.modules["/Preferences.js"]._cached = module.exports;
    return module.exports;
};

require.modules["/Careplane.js"] = function () {
    var module = { exports : {} };
    var exports = module.exports;
    var __dirname = "/";
    var __filename = "/Careplane.js";
    
    var require = function (file) {
        return __require(file, "/");
    };
    
    require.resolve = function (file) {
        return __require.resolve(name, "/");
    };
    
    require.modules = __require.modules;
    __require.modules["/Careplane.js"]._cached = module.exports;
    
    (function () {
        Careplane = function() {};

Careplane.standardTextAttribution = 'Emission estimates powered by <a href="http://brighterplanet.com">Brighter Planet</a>';
  
Careplane.insertBadge = function(parentElement, referenceElement, badgeStyles) {
  var badge = $('<div class="brighter_planet_cm1_badge"><p><a href="http://brighterplanet.com"><span class="setup">Carbon powered by</span> <span class="punchline">Brighter Planet</span></a></p></div>');

  if(referenceElement) {
    referenceElement.before(badge);
  } else {
    parentElement.append(badge);
  }

  if(badgeStyles) {
    for(var name in badgeStyles) {
      badge.css(name, badgeStyles[name]);
    }
  }

};

Careplane.fetch = function(url, callback) {
  $.ajax({
    url: url,
    success: callback
  });
};

Careplane.prototype.log = function(str) {
  this.klass.log(str);
};

Careplane.prototype.isPollingEnabled = true;

Careplane.prototype.driverShouldMonitor = function(driverClass, doc) {
  var match = doc.location.href.match(driverClass.monitorURL);

  if(driverClass.monitorExcludeURL) {
    var staticMatch = doc.location.href.match(driverClass.monitorExcludeURL);
    return match && staticMatch == null;
  } else {
    return match != null;
  }
};

Careplane.prototype.loadDriver = function() {
  Careplane.currentExtension = this;
  var extension = this;
  [Hipmunk, Kayak, KayakUK, Orbitz].forEach(function(driver) {
    if(extension.driverShouldMonitor(driver, extension.doc)) {
      extension.prefs.getBoolean('sites.' + driver.driverName,
                            CareplaneEvents.driverBecomesAvailable(extension, driver),
                            true);
    }
  });
};



CareplaneEvents = {
  driverBecomesAvailable: function(extension, driverClass) {
    return function(driverEnabled) {
      if(driverEnabled) {
        Careplane.currentDriver = new driverClass(extension);
        Careplane.currentDriver.load();
      }
    };
  },

  hideEmissionEstimates: function(doc) {
    return function() {
      $('.careplane-footprint', doc).hide();
    };
  }
}

exports.Careplane = Careplane;
;
    }).call(module.exports);
    
    __require.modules["/Careplane.js"]._cached = module.exports;
    return module.exports;
};

process.nextTick(function () {
    var module = { exports : {} };
    var exports = module.exports;
    var __dirname = "/";
    var __filename = "//Users/dkastner/careplane/src";
    
    var require = function (file) {
        return __require(file, "/");
    };
    require.modules = __require.modules;
    
    var Hipmunk = require('./drivers/Hipmunk').Hipmunk;
//var Kayak = require('./drivers/Kayak').Kayak;
//var KayakUK = require('./drivers/KayakUK').KayakUK;
//var Orbitz = require('./drivers/Orbitz').Orbitz;

var TestPreferences = require('./browser/test/TestPreferences').TestPreferences;

var Careplane = require('./Careplane').Careplane;

TestExtension = function(doc) {
  this.doc = doc;
  this.klass = TestExtension;
  this.tracker = {
    welcome: function() {},
    search: function() {},
    purchase: function() {},
    purchaseComparison: function() {}
  };
  this.prefs = new TestPreferences();
};
TestExtension.prototype = new Careplane();

TestExtension.urlMap = {};

TestExtension.fetch = function(url, callback) {
  for(var pattern in TestExtension.urlMap) {
    var regex = new RegExp(pattern);
    if(regex.test(url)) {
      callback(TestExtension.urlMap[pattern]);
      return;
    }
  }
  TestExtension.log("TestExtension.fetch doesn't know what to do with URL " + url);
};

TestExtension.log = function(str) {
  if(typeof console != 'undefined') {
    console.log(str);
  } else if(typeof jasmine != 'undefined') {
    jasmine.log(str);
  } else if(typeof capy != 'undefined') {
    capy.log(str);
  } else {
    throw 'Unable to log to anything';
  }
};

TestExtension.prototype.isPollingEnabled = false;

TestExtension.prototype.fetch = function(url, callback) {
  TestExtension.fetch(url, callback);
};

TestExtension.prototype.log = function(str) {
  TestExtension.log(str);
};

TestExtension.prototype.welcome = function() {
  TestExtension.log('Welcome!');
};
  
TestExtension.prototype.notify = function(driver) {
  TestExtension.log('Careplane is calculating the carbon footprint of your ' + driver.driverName() + ' flight search results.'); 
};

TestExtension.prototype.addStyleSheet = function() { /* NOOP */ };
;
});
