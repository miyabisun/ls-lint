(function(){
  var ref$, map, fold, filter, join, levelMark, worstLevel, println, sumUp, worstMark;
  ref$ = require('prelude-ls'), map = ref$.map, fold = ref$.fold, filter = ref$.filter, join = ref$.join;
  ref$ = require('./report-utils'), levelMark = ref$.levelMark, worstLevel = ref$.worstLevel, println = ref$.println;
  module.exports = function(results){
    var pluraize, fileNum, fileNumStr, sums, resultMarkStr, resultStr;
    pluraize = function(it){
      if (it !== 1) {
        return 's';
      } else {
        return '';
      }
    };
    fileNum = results.length;
    fileNumStr = fileNum + " file" + pluraize(fileNum);
    sums = sumUp(['fatal', 'error', 'warning'], results);
    resultMarkStr = worstMark(sums);
    resultStr = join(', ')(
    map(function(it){
      return it[1] + " " + it[0] + pluraize(it[1]);
    })(
    sums));
    return println("\n  " + resultMarkStr + " " + resultStr + " in " + fileNumStr + ".\n");
  };
  sumUp = curry$(function(targets, results){
    var countUp, sumFile, sumAll;
    results == null && (results = []);
    countUp = function(target){
      return function(count, arg$){
        var level;
        level = arg$.level;
        return count + (level === target ? 1 : 0);
      };
    };
    sumFile = function(target){
      return function(count, arg$){
        var results, ref$;
        results = (ref$ = arg$.results) != null
          ? ref$
          : [];
        return fold(countUp(target), count, results);
      };
    };
    sumAll = function(target){
      return fold(sumFile(target), 0);
    };
    return map(function(target){
      return [target, sumAll(target)(results)];
    })(
    targets);
  });
  worstMark = function(result){
    var this$ = this;
    return levelMark(
    worstLevel(
    map(function(it){
      return it[0];
    })(
    filter(function(it){
      return it[1] > 0;
    })(
    result))));
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
