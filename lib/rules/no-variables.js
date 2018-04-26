(function(){
  var rule, message, lsc, camelize;
  rule = 'no-variables';
  message = "Should not rewrite variables.";
  lsc = require('livescript');
  camelize = require('prelude-ls').camelize;
  module.exports = function(arg$){
    var src, config, level, e, result;
    src = arg$.src, config = arg$.config;
    level = config[camelize(rule)];
    if (level !== 'ignore') {
      try {
        lsc.compile(src, {
          'const': true
        });
      } catch (e$) {
        e = e$;
        if (result = /.*constant.* on line (\d+)/.exec(e.message)) {
          return {
            rule: rule,
            level: level,
            line: +result[1],
            message: message
          };
        } else {
          throw e;
        }
      }
    }
  };
}).call(this);
