(function(){
  var ref$, each, empty, map, lines, unlines, myPackage, loadConfig, readDefaultConfig, lintFiles, reportLintFile, reportTotal, reportError, print, println, returnP, bindP, catchP, promisize, parse, action, lint, getConfig, printVersion, printHelp, printConfig, optionator;
  ref$ = require('prelude-ls'), each = ref$.each, empty = ref$.empty, map = ref$.map, lines = ref$.lines, unlines = ref$.unlines;
  myPackage = require('../package.json');
  loadConfig = require('./load-config');
  readDefaultConfig = require('./default-config').readDefaultConfig;
  lintFiles = require('./lint-files');
  reportLintFile = require('./reporters/report-lint-file');
  reportTotal = require('./reporters/report-total');
  reportError = require('./reporters/report-error');
  ref$ = require('./reporters/report-utils'), print = ref$.print, println = ref$.println;
  ref$ = require('./utils/monad-p'), returnP = ref$.returnP, bindP = ref$.bindP, catchP = ref$.catchP, promisize = ref$.promisize;
  module.exports = function(argv){
    return catchP(bindP(bindP(bindP(returnP(argv), parse), action), function(){
      return process.exit(0);
    }), function(it){
      reportError(it);
      return process.exit(1);
    });
  };
  parse = promisize(function(done, _, argv){
    return done(optionator.parseArgv(argv));
  });
  action = function(options){
    switch (false) {
    case !options.version:
      return printVersion();
    case !options.help:
      return printHelp();
    case !options.printConfig:
      return printConfig(options.config);
    case !empty(options._):
      return printHelp(1);
    default:
      return lint(options._, options.config);
    }
  };
  lint = function(files, configFile){
    return bindP(bindP(bindP(bindP(getConfig(configFile), function(config){
      return lintFiles(files, {
        config: config
      });
    }), function(it){
      println('');
      return returnP(it);
    }), function(it){
      map(function(it){
        return reportLintFile(it.file, it.results);
      }, it);
      return returnP(it);
    }), reportTotal);
  };
  getConfig = promisize(function(done, _, file){
    return done(loadConfig(file));
  });
  printVersion = function(){
    println(myPackage.version + "");
    return returnP();
  };
  printHelp = function(){
    println(
    unlines(
    map(function(it){
      return "  " + it;
    })(
    lines(
    optionator.generateHelp()))));
    return returnP();
  };
  printConfig = function(configFile){
    if (configFile) {
      return bindP(getConfig(configFile), function(){
        throw Error('unimplemented');
      });
    } else {
      print(readDefaultConfig());
      return returnP();
    }
  };
  optionator = require('optionator')({
    prepend: '\nlint livescript source files\n\nUsage: ls-lint [options]... [files]...',
    append: "Version " + myPackage.version + "\n",
    options: [
      {
        heading: 'Options'
      }, {
        option: 'help',
        alias: 'h',
        type: 'Boolean',
        description: 'output usage information'
      }, {
        option: 'version',
        alias: 'v',
        type: 'Boolean',
        description: 'output the version number'
      }, {
        option: 'config',
        alias: 'c',
        type: 'file::String',
        description: 'use specified configuration file'
      }, {
        option: 'print-config',
        type: 'Boolean',
        description: 'print the configuration'
      }
    ]
  });
}).call(this);
