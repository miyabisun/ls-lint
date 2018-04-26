(function(){
  var ref$, isType, map, fold, compact, bracketsSpacing, arrowSpacing, checkSequence, getChecker, isEqualPos, isOptional;
  ref$ = require('prelude-ls'), isType = ref$.isType, map = ref$.map, fold = ref$.fold, compact = ref$.compact;
  bracketsSpacing = require('./spacing/brackets-spacing');
  arrowSpacing = require('./spacing/arrow-spacing');
  module.exports = function(arg$){
    var tokens, config, checkSpacing, this$ = this;
    tokens = arg$.tokens, config = arg$.config;
    checkSpacing = getChecker(
    map((function(it){
      return it(config);
    }))(
    [
      bracketsSpacing({
        type: 'parentheses',
        start: '(',
        end: ')'
      }), bracketsSpacing({
        type: 'braces',
        start: '{',
        end: '}'
      }), bracketsSpacing({
        type: 'brackets',
        start: '[',
        end: ']'
      }), arrowSpacing
    ]));
    return compact(
    function(it){
      return it.result;
    }(
    fold(checkSequence(checkSpacing), {
      result: []
    })(
    tokens)));
  };
  checkSequence = curry$(function(checkSpacing, arg$, next){
    var pre, post, result, nextResult;
    pre = arg$.pre, post = arg$.post, result = arg$.result;
    if (pre != null) {
      if (isEqualPos(post, next) && post.spaced == null && isOptional(post)) {
        return {
          pre: pre,
          post: next,
          result: result
        };
      } else {
        nextResult = result.concat(checkSpacing(pre, post, next));
        return {
          pre: post,
          post: next,
          result: nextResult
        };
      }
    } else {
      return {
        pre: next,
        post: next,
        result: result
      };
    }
  });
  getChecker = function(ruleModules){
    return function(pre, post, next){
      return fold(curry$(function(x$, y$){
        return x$.concat(y$);
      }), [])(
      map(function(it){
        return it(pre, post, next);
      })(
      ruleModules));
    };
  };
  isEqualPos = function(a, b){
    return a[3] === b[3] && a[4] === b[4];
  };
  isOptional = function(it){
    return !(it[0] === 'ID' || it[0] === 'STRNUM');
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
