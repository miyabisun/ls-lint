(function(){
  var globAll, fs, ref$, p, promisizeApi, lsLint, slice$ = [].slice;
  globAll = require('glob-all');
  fs = require('fs');
  ref$ = require('./utils/monad-p'), p = ref$.monadP, promisizeApi = ref$.promisizeApi;
  lsLint = require('./ls-lint');
  module.exports = function(paths, opts){
    var readFile, lsLintP, lintFile, lintResult, asyncGlob, lintFiles;
    readFile = promisizeApi(partialize$.apply(fs, [bind$(fs, 'readFile'), [void 8, 'utf8', void 8], [0, 2]]));
    lsLintP = compose$(partialize$.apply(lsLint, [lsLint.lint, [void 8, opts], [0]]), p['return']);
    lintFile = p['>=>'](readFile, lsLintP);
    lintResult = function(f){
      return p['>>='](lintFile(f), function(it){
        return p['return']({
          file: f,
          results: it
        });
      });
    };
    asyncGlob = promisizeApi(globAll);
    lintFiles = p.mapM(lintResult);
    return p['>=>'](asyncGlob, lintFiles)(
    paths);
  };
  function partialize$(f, args, where){
    var context = this;
    return function(){
      var params = slice$.call(arguments), i,
          len = params.length, wlen = where.length,
          ta = args ? args.concat() : [], tw = where ? where.concat() : [];
      for(i = 0; i < len; ++i) { ta[tw[0]] = params[i]; tw.shift(); }
      return len < wlen && len ?
        partialize$.apply(context, [f, ta, tw]) : f.apply(context, ta);
    };
  }
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function compose$() {
    var functions = arguments;
    return function() {
      var i, result;
      result = functions[0].apply(this, arguments);
      for (i = 1; i < functions.length; ++i) {
        result = functions[i](result);
      }
      return result;
    };
  }
}).call(this);
