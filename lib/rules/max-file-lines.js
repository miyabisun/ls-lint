(function(){
  var rule, message, ref$, camelize, Str;
  rule = 'max-file-lines';
  message = function(it){
    return "Max number of lines allowed is " + it + ".";
  };
  ref$ = require('prelude-ls'), camelize = ref$.camelize, Str = ref$.Str;
  module.exports = function(arg$){
    var lines, config, ref$, level, value;
    lines = arg$.lines, config = arg$.config;
    ref$ = config[camelize(rule)], level = ref$.level, value = ref$.value;
    if (level !== 'ignore' && lines.length > value) {
      return {
        rule: rule,
        line: lines.length,
        level: level,
        message: message(value)
      };
    }
  };
}).call(this);
