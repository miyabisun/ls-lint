(function(){
  var rule, message, ref$, map, compact, camelize;
  rule = 'max-line-length';
  message = function(it){
    return "Max line length should be " + it + ".";
  };
  ref$ = require('prelude-ls'), map = ref$.map, compact = ref$.compact, camelize = ref$.camelize;
  module.exports = function(arg$){
    var lines, config, ref$, level, value;
    lines = arg$.lines, config = arg$.config;
    ref$ = config[camelize(rule)], level = ref$.level, value = ref$.value;
    if (level !== 'ignore') {
      return compact(
      map(function(it){
        if (it.src.length > value) {
          return {
            rule: rule,
            line: it.line,
            level: level,
            message: message(value)
          };
        }
      })(
      lines));
    }
  };
}).call(this);
