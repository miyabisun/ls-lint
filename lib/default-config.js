(function(){
  var fs, path, loadLson, loadDefaultConfig, readDefaultConfig, defaultConfigFile, out$ = typeof exports != 'undefined' && exports || this;
  fs = require('fs');
  path = require('path');
  loadLson = require('./load-lson');
  out$.loadDefaultConfig = loadDefaultConfig = function(){
    return loadLson(defaultConfigFile);
  };
  out$.readDefaultConfig = readDefaultConfig = function(){
    return fs.readFileSync(defaultConfigFile, {
      encoding: 'utf8'
    });
  };
  defaultConfigFile = path.resolve(path.dirname(
  module.filename), '../ls-lint.lson');
}).call(this);
