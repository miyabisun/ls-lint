(function(){
  var ref$, Str, isType, map, fold, filter, flatten, dasherize, namingConventions, getIdentifier, makeId, makeFunc, getName, foldDeep;
  ref$ = require('prelude-ls'), Str = ref$.Str, isType = ref$.isType, map = ref$.map, fold = ref$.fold, filter = ref$.filter, flatten = ref$.flatten, dasherize = ref$.dasherize;
  namingConventions = require('./identifier/naming-conventions');
  module.exports = function(arg$){
    var tokens, ast, lines, config, this$ = this;
    tokens = arg$.tokens, ast = arg$.ast, lines = arg$.lines, config = arg$.config;
    return flatten(
    map(namingConventions(config))(
    filter(function(it){
      return it.type != null;
    })(
    foldDeep(getIdentifier(tokens, lines), ast))));
  };
  getIdentifier = curry$(function(tokens, lines, obj){
    var ref$, type;
    switch (false) {
    case obj.title == null:
      return [makeId(lines, 'class', obj.title)];
    case !(obj.key != null && obj.val != null):
      return [makeId(lines, 'property', obj.key)];
    case !(obj.params != null && obj.body != null && obj.name != null):
      return [makeFunc(lines, 'function', obj)];
    case !(((ref$ = obj.left) != null ? ref$.value : void 8) != null && obj.left.value !== 'void' && obj.left.line != null):
      type = obj['const'] ? 'constant' : 'variable';
      return [makeId(lines, type, obj.left)];
    default:
      return [];
    }
  });
  makeId = curry$(function(lines, type, obj){
    var name;
    name = getName(lines, obj.line - 1, obj.column);
    return {
      line: obj.line - 1,
      column: obj.column,
      type: type,
      name: name
    };
  });
  makeFunc = curry$(function(lines, type, obj){
    return function(it){
      var name, chainName, camelIndex, chainIndex;
      name = obj.name;
      chainName = dasherize(name);
      camelIndex = it.lastIndexOf(name);
      chainIndex = it.lastIndexOf(chainName);
      if (camelIndex < chainIndex) {
        return {
          line: obj.line - 1,
          column: chainIndex,
          type: type,
          name: chainName
        };
      } else if (0 <= camelIndex) {
        return {
          line: obj.line - 1,
          column: camelIndex,
          type: type,
          name: name
        };
      } else {
        return {};
      }
    }(
    Str.drop(obj.column)(
    function(it){
      if (obj.line === obj.body.line) {
        return Str.take(obj.body.column)(
        it);
      } else {
        return it;
      }
    }(
    lines[obj.line - 1].src)));
  });
  getName = curry$(function(lines, line, column){
    return function(it){
      var ref$, ref1$;
      return (ref$ = (ref1$ = /".*"|'.*'|(?:[\w-]|[^\x01-\x7e])+/.exec(it)) != null ? ref1$[0] : void 8) != null ? ref$ : '';
    }(
    Str.drop(column)(
    lines[line].src));
  });
  foldDeep = curry$(function(func, obj){
    if (isType('Object', obj)) {
      return fold(curry$(function(x$, y$){
        return x$.concat(y$);
      }), func(obj))(
      map(foldDeep(func))(
      filter(function(it){
        return isType('Object', it) || isType('Array', it);
      })(
      map(function(it){
        return obj[it];
      })(
      Object.keys(
      obj)))));
    } else if (isType('Array', obj)) {
      return fold(curry$(function(x$, y$){
        return x$.concat(y$);
      }), [])(
      map(foldDeep(func))(
      filter(function(it){
        return isType('Object', it) || isType('Array', it);
      })(
      obj)));
    } else {
      return [];
    }
  });
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
