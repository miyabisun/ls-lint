(function(){
  var rule, message, ref$, last, camelize, Str;
  rule = 'eol-last';
  message = "Last line needs single EOL.";
  ref$ = require('prelude-ls'), last = ref$.last, camelize = ref$.camelize, Str = ref$.Str;
  module.exports = function(arg$){
    var lines, config, level, lastLine;
    lines = arg$.lines, config = arg$.config;
    level = config[camelize(rule)];
    if (level !== 'ignore') {
      lastLine = last(lines);
      if (lastLine && (Str.empty(lastLine.src) || lastLine.eol == null)) {
        return {
          rule: rule,
          line: lastLine.line,
          level: level,
          message: message
        };
      }
    }
  };
}).call(this);
