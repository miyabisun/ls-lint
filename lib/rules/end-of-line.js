(function(){
  var rule, message, ref$, map, compact, camelize, getValueSet;
  rule = 'end-of-line';
  message = function(it){
    return "End of line should be " + it + ".";
  };
  ref$ = require('prelude-ls'), map = ref$.map, compact = ref$.compact, camelize = ref$.camelize;
  module.exports = function(arg$){
    var lines, config, ref$, level, value, valueSet;
    lines = arg$.lines, config = arg$.config;
    ref$ = config[camelize(rule)], level = ref$.level, value = ref$.value;
    valueSet = getValueSet(value);
    if (level !== 'ignore' && valueSet) {
      return compact(
      map(function(it){
        if (it.eol != null && it.eol !== valueSet.value) {
          return {
            rule: rule,
            line: it.line,
            level: level,
            message: message(valueSet.name)
          };
        }
      })(
      lines));
    }
  };
  getValueSet = function(it){
    switch (false) {
    case !(it === 'LF' || it === 'lf'):
      return {
        name: 'LF',
        value: '\n'
      };
    case !(it === 'CRLF' || it === 'crlf'):
      return {
        name: 'CRLF',
        value: '\r\n'
      };
    default:
      return null;
    }
  };
}).call(this);
