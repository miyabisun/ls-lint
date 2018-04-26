(function(){
  var map, pureP, returnP, failP, fmapP, bindP, apP, kcomP, catchP, seqP, mapMP, monadP, promisize, promisizeApi, out$ = typeof exports != 'undefined' && exports || this;
  map = require('prelude-ls').map;
  pureP = returnP = bind$(Promise, 'resolve');
  failP = bind$(Promise, 'reject');
  fmapP = curry$(function(f, p){
    return p.then(f);
  });
  bindP = curry$(function(p, f){
    return p.then(f);
  });
  apP = curry$(function(pf, p){
    return pf.then(function(f){
      return p.then(f);
    });
  });
  kcomP = curry$(function(f, g){
    return function(x){
      return f(x).then(g);
    };
  });
  catchP = curry$(function(p, f){
    return p['catch'](f);
  });
  seqP = bind$(Promise, 'all');
  mapMP = curry$(function(f, l){
    return seqP(map(f, l));
  });
  monadP = {
    pure: pureP,
    'return': returnP,
    fail: failP,
    fmap: fmapP,
    bind: bindP,
    'catch': catchP,
    seq: seqP,
    mapM: mapMP,
    '<$>': fmapP,
    '>>=': bindP,
    '<*>': apP,
    '>=>': kcomP
  };
  promisize = curry$(function(f, a){
    return new Promise(function(d, c){
      return f(d, c, a);
    });
  });
  promisizeApi = curry$(function(f, a){
    return new Promise(function(d, c){
      return f(a, function(err, data){
        if (!err) {
          return d(data);
        } else {
          return c(err);
        }
      });
    });
  });
  out$.pureP = pureP;
  out$.returnP = returnP;
  out$.failP = failP;
  out$.fmapP = fmapP;
  out$.bindP = bindP;
  out$.apP = apP;
  out$.kcomP = kcomP;
  out$.catchP = catchP;
  out$.seqP = seqP;
  out$.mapMP = mapMP;
  out$.monadP = monadP;
  out$.promisize = promisize;
  out$.promisizeApi = promisizeApi;
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
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
