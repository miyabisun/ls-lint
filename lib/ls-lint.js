(function(){
  var lsc, ref$, Obj, Str, empty, map, compact, flatten, reject, split, last, initial, sortWith, loadDefaultConfig, loadRuleModules, deepMerge, lint, ruleModules, defaultConfig, restructSrc, restructSrcLine, trimLast, compareColumn, out$ = typeof exports != 'undefined' && exports || this, slice$ = [].slice;
  lsc = require('livescript');
  ref$ = require('prelude-ls'), Obj = ref$.Obj, Str = ref$.Str, empty = ref$.empty, map = ref$.map, compact = ref$.compact, flatten = ref$.flatten, reject = ref$.reject, split = ref$.split, last = ref$.last, initial = ref$.initial, sortWith = ref$.sortWith;
  loadDefaultConfig = require('./default-config').loadDefaultConfig;
  loadRuleModules = require('./load-rule-modules');
  deepMerge = require('./utils/util-obj').deepMerge;
  out$.lint = lint = function(src, opts){
    var tokens, ast, e, result, ref$, message, line, config, lintTarget, this$ = this;
    opts == null && (opts = {});
    try {
      tokens = lsc.lex(src);
      ast = lsc.ast(src);
    } catch (e$) {
      e = e$;
      result = /(.*) on line (\d+)|(.*)/.exec(e.message);
      ref$ = result[1]
        ? [result[1], +result[2]]
        : [result[3], void 8], message = ref$[0], line = ref$[1];
      return [{
        rule: 'compile',
        level: 'fatal',
        line: line,
        message: message
      }];
    }
    config = deepMerge(defaultConfig, opts.config);
    lintTarget = {
      tokens: tokens,
      ast: ast,
      src: src,
      config: config,
      lines: restructSrc(src)
    };
    return sortWith(function(x, y){
      switch (false) {
      case !(x.line > y.line):
        return 1;
      case !(x.line < y.line):
        return -1;
      default:
        return compareColumn(x, y);
      }
    })(
    reject(Obj.empty)(
    compact(
    flatten(
    map((function(it){
      return it(lintTarget);
    }))(
    ruleModules)))));
  };
  ruleModules = loadRuleModules(
  ['./rules/*.js']);
  defaultConfig = loadDefaultConfig();
  restructSrc = function(it){
    return restructSrcLine(1)(
    trimLast(
    split(/(\r?\n)/)(
    it)));
  };
  restructSrcLine = curry$(function(line, arg$){
    var src, eol, cs;
    src = arg$[0], eol = arg$[1], cs = slice$.call(arg$, 2);
    if (src != null) {
      return [{
        line: line,
        src: src,
        eol: eol
      }].concat(empty(cs)
        ? []
        : restructSrcLine(line + 1, cs));
    } else {
      return [];
    }
  });
  trimLast = function(it){
    if (Str.empty(last(it))) {
      return initial(it);
    } else {
      return it;
    }
  };
  compareColumn = function(x, y){
    switch (false) {
    case !(x.column != null && y.column == null):
      return -1;
    case !(x.column == null && y.column != null):
      return 1;
    case !!(x.column != null && y.column != null):
      return 0;
    default:
      return x.column - y.column;
    }
  };
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
