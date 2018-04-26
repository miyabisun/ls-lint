(function(){
  var ref$, each, map, fold, levelMark, worstLevel, println, formatLintResult;
  ref$ = require('prelude-ls'), each = ref$.each, map = ref$.map, fold = ref$.fold;
  ref$ = require('./report-utils'), levelMark = ref$.levelMark, worstLevel = ref$.worstLevel, println = ref$.println;
  module.exports = curry$(function(file, results){
    var this$ = this;
    results == null && (results = []);
    (function(it){
      return println("    " + levelMark(it) + " " + file);
    })(
    worstLevel(
    map(function(it){
      return it.level;
    })(
    results)));
    return each(function(it){
      return println("      " + formatLintResult(it));
    })(
    results);
  });
  formatLintResult = function(it){
    var place;
    place = (function(){
      switch (false) {
      case it.line != null:
        return '';
      case it.column != null:
        return " (" + it.line + ")";
      default:
        return " (" + it.line + ":" + it.column + ")";
      }
    }());
    return levelMark(it.level) + " " + it.message + place;
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
