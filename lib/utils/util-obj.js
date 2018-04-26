(function(){
  var ref$, Obj, isType, empty, compact, fold, keys, deepMerge, mergeObj, mergeProperty, isObject, out$ = typeof exports != 'undefined' && exports || this;
  ref$ = require('prelude-ls'), Obj = ref$.Obj, isType = ref$.isType, empty = ref$.empty, compact = ref$.compact, fold = ref$.fold, keys = ref$.keys;
  out$.deepMerge = deepMerge = function(a){
    var bs, res$, i$, to$;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    bs = res$;
    switch (false) {
    case !empty(compact(bs)):
      return a;
    default:
      return mergeObj(a, deepMerge.apply(null, bs));
    }
  };
  mergeObj = function(a, b){
    return fold(mergeProperty(b), a)(
    keys(a).concat(keys(b)));
  };
  mergeProperty = function(src){
    return curry$(function(obj, key){
      var a, b, ref$;
      a = obj[key];
      b = src[key];
      if (b != null) {
        if (a != null && isObject(a) && isObject(b)) {
          return ref$ = clone$(obj), ref$[key + ""] = mergeObj(a, b), ref$;
        } else {
          return ref$ = clone$(obj), ref$[key + ""] = b, ref$;
        }
      } else {
        return obj;
      }
    });
  };
  isObject = isType('Object');
  function clone$(it){
    function fun(){} fun.prototype = it;
    return new fun;
  }
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
