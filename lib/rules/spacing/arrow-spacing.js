(function(){
  var rule, message, ref$, camelize, map, getMessage;
  rule = 'arrow-spacing';
  message = ['A space is necessary before an arrow.', 'No space is necessary before an arrow.', 'A space is necessary after an arrow.', 'No space is necessary after an arrow.', 'Spaces are necessary around an arrow.', 'No space is necessary around an arrow.'];
  ref$ = require('prelude-ls'), camelize = ref$.camelize, map = ref$.map;
  module.exports = function(config){
    var ref$, level, value;
    ref$ = config[camelize(rule)], level = ref$.level, value = ref$.value;
    if (level !== 'ignore') {
      return function(pre, post, next){
        var beforeSpacing, afterSpacing;
        if (post[0] === '->' || post[0] === '<-') {
          beforeSpacing = (function(){
            switch (false) {
            case pre[0] === ')PARAM':
              return value.before;
            case pre.spaced == null:
              return true;
            default:
              return false;
            }
          }());
          afterSpacing = (function(){
            switch (false) {
            case !/\)|\]|}/.test(next[0]):
              return value.after;
            case post.spaced == null:
              return true;
            default:
              return false;
            }
          }());
          return map(function(it){
            return {
              rule: rule,
              line: post[2] + 1,
              column: post[3] + 1,
              level: level,
              message: it
            };
          })(
          getMessage(beforeSpacing, afterSpacing, value));
        }
      };
    } else {
      return function(){};
    }
  };
  getMessage = function(beforeSpacing, afterSpacing, value){
    var matchBefore, matchAfter, beforeNg, afterNg, bothNg;
    matchBefore = beforeSpacing === value.before;
    matchAfter = afterSpacing === value.after;
    beforeNg = !matchBefore && matchAfter;
    afterNg = matchBefore && !matchAfter;
    bothNg = !matchBefore && !matchAfter;
    switch (false) {
    case !(beforeNg && value.before):
      return [message[0]];
    case !(beforeNg && !value.before):
      return [message[1]];
    case !(afterNg && value.after):
      return [message[2]];
    case !(afterNg && !value.after):
      return [message[3]];
    case !(bothNg && value.before && value.after):
      return [message[4]];
    case !(bothNg && !(value.before || value.after)):
      return [message[5]];
    case !(bothNg && value.before && !value.after):
      return [message[0], message[3]];
    case !(bothNg && !value.before && value.after):
      return [message[1], message[2]];
    default:
      return [];
    }
  };
}).call(this);
