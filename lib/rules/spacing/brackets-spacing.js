(function(){
  var getRule, getMessage, camelize, starts, ends;
  getRule = function(it){
    return it + "-spacing";
  };
  getMessage = function(type, value){
    return (value ? 'Spaces are' : 'No space is') + " necessary inside " + type + ".";
  };
  camelize = require('prelude-ls').camelize;
  module.exports = curry$(function(brackets, config){
    var type, start, end, rule, ref$, level, value, message;
    type = brackets.type, start = brackets.start, end = brackets.end;
    rule = getRule(type);
    ref$ = config[camelize(rule)], level = ref$.level, value = ref$.value;
    message = getMessage(type, value);
    if (level !== 'ignore') {
      return function(pre, post, next){
        if (starts(pre[0], start) || ends(post[0], end)) {
          if (!pre.eol && !pre.spaced !== !value) {
            return {
              rule: rule,
              line: post[2] + 1,
              column: post[3] + 1,
              level: level,
              message: message
            };
          }
        }
      };
    } else {
      return function(){};
    }
  });
  starts = function(str, start){
    switch (false) {
    case !String.prototype.startsWith:
      return str.startsWith(start);
    default:
      return start === str.substr(0, start.length);
    }
  };
  ends = function(str, end){
    switch (false) {
    case !String.prototype.endsWith:
      return str.endsWith(end);
    default:
      return end === str.substr(-end.length);
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
