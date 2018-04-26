(function(){
  var rule, message, ref$, filter, reject, map, compact, camelize, verify, getValueStr;
  rule = 'indent';
  message = function(it){
    return "Indent should be " + it + ".";
  };
  ref$ = require('prelude-ls'), filter = ref$.filter, reject = ref$.reject, map = ref$.map, compact = ref$.compact, camelize = ref$.camelize;
  module.exports = function(arg$){
    var tokens, lines, config, ref$, level, value, this$ = this;
    tokens = arg$.tokens, lines = arg$.lines, config = arg$.config;
    ref$ = config[camelize(rule)], level = ref$.level, value = ref$.value;
    if (level !== 'ignore') {
      return compact(
      map(verify(lines, level, value))(
      reject(function(it){
        return it[1] === 0;
      })(
      filter(function(it){
        return it[0] === 'INDENT';
      })(
      tokens))));
    }
  };
  verify = curry$(function(lines, level, value, token){
    var char, result, ref$, line, column;
    char = lines[token[2]].src.charAt(token[3] - token[1]);
    result = value === 'tab'
      ? token[1] === 1 && char === '\t'
      : token[1] === value && char === ' ';
    if (!result) {
      ref$ = [token[2] + 1, token[3] + 1], line = ref$[0], column = ref$[1];
      return {
        rule: rule,
        line: line,
        column: column,
        level: level,
        message: message(getValueStr(value))
      };
    }
  });
  getValueStr = function(it){
    switch (false) {
    case it !== 'tab':
      return it;
    case it !== 1:
      return "1 space";
    default:
      return it + " spaces";
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
