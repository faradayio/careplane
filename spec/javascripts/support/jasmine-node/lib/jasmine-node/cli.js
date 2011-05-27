var jasmine = require('jasmine-node');
var sys = require('sys'),
    Path= require('path');


var specFolder = Path.join(process.cwd(),'spec');
var specMatch = null;

for (var key in jasmine)
  global[key] = jasmine[key];

var isVerbose = false;
var showColors = true;
var extentions = "js";

function parseArg(arg) {
  switch(arg)
  {
    case '--color':
      showColors = true;
      break;
    case '--noColor':
      showColors = false;
      break;
    case '--verbose':
      isVerbose = true;
      break;
    case '--coffee':
      require('coffee-script');
      extentions = "js|coffee";
      break;
    default:
      if (arg.match(/^--/)) {
        help();
      } else {
        specMatch = arg;
      }
      break;
  }
}

process.argv.slice(2).forEach(function(arg) {
  parseArg(arg);
});

var match;
if(specMatch) {
  var base = specMatch;
  base = base + '.*';
  if(base.match(/spec/i) <= 0) {
    base = base + 'spec';
  }

  match = new RegExp(base + "\\.js$", 'i');
} else {
  match = new RegExp(/spec\.js$/i);
}

jasmine.loadHelpersInFolder(specFolder, new RegExp(/[hH]elper\.js$/));
jasmine.executeSpecsInFolder(specFolder, function(runner, log){
  sys.print('\n');
  if (runner.results().failedCount == 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}, isVerbose, showColors, match);

function help(){
  sys.print('USAGE: jasmine-node [--color|--noColor] [--verbose] [--coffee] [matcher]\n');
  sys.print('\n');
  sys.print('Options:\n');
  sys.print('  --color      - use color coding for output\n');
  sys.print('  --noColor    - do not use color coding for output\n');
  sys.print('  --verbose    - print extra information per each test run\n');
  sys.print('  --coffee     - load coffee-script which allows execution .coffee files\n');
  
  process.exit(1);
}
