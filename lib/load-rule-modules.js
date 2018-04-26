(function(){
  var map, path, globAll, moduledir, editPath, resolvePath, relativePath;
  map = require('prelude-ls').map;
  path = require('path');
  globAll = require('glob-all');
  module.exports = function(ruleModulePaths){
    return map(function(it){
      return require(it);
    })(
    map(function(it){
      return "./" + it;
    })(
    map(relativePath)(
    globAll.sync(
    map(resolvePath)(
    ruleModulePaths)))));
  };
  moduledir = path.dirname(
  module.filename);
  editPath = curry$(function(act, file){
    return path[act](moduledir, file);
  });
  resolvePath = editPath('resolve');
  relativePath = editPath('relative');
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
