(function(){
  var fs, path, loadLson, deepMerge, loadOptionalLson, currentConfig;
  fs = require('fs');
  path = require('path');
  loadLson = require('./load-lson');
  deepMerge = require('./utils/util-obj').deepMerge;
  module.exports = function(configFile){
    var requestConfig;
    requestConfig = configFile
      ? loadLson(configFile)
      : {};
    return deepMerge(currentConfig, requestConfig);
  };
  loadOptionalLson = function(lsonFile){
    var e;
    try {
      fs.accessSync(lsonFile, fs.R_OK);
    } catch (e$) {
      e = e$;
      return {};
    }
    return loadLson(lsonFile);
  };
  currentConfig = loadOptionalLson("./ls-lint.lson");
}).call(this);
