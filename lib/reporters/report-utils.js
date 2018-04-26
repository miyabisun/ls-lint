(function(){
  var fold, red, green, yellow, magenta, grey, levelMark, levelValue, worseLevel, worstLevel, print, println, printerr, printerrln, out$ = typeof exports != 'undefined' && exports || this;
  fold = require('prelude-ls').fold;
  red = function(it){
    return "\x1b[31m" + it + "\x1b[39m";
  };
  green = function(it){
    return "\x1b[32m" + it + "\x1b[39m";
  };
  yellow = function(it){
    return "\x1b[33m" + it + "\x1b[39m";
  };
  magenta = function(it){
    return "\x1b[35m" + it + "\x1b[39m";
  };
  grey = function(it){
    return "\x1b[90m" + it + "\x1b[39m";
  };
  levelMark = function(it){
    switch (it) {
    case 'fatal':
      return magenta('☠');
    case 'error':
      return red('✗');
    case 'warning':
      return yellow('☞');
    case 'ok':
      return green('✓');
    default:
      return grey('⁇');
    }
  };
  levelValue = function(it){
    switch (it) {
    case 'fatal':
      return 3;
    case 'error':
      return 2;
    case 'warning':
      return 1;
    case 'ok':
      return 0;
    default:
      return -1;
    }
  };
  worseLevel = function(a, b){
    if (levelValue(a) > levelValue(b)) {
      return a;
    } else {
      return b;
    }
  };
  worstLevel = fold(worseLevel, 'ok');
  print = function(it){
    return process.stdout.write(it);
  };
  println = function(it){
    return print(it + "\n");
  };
  printerr = function(it){
    return process.stderr.write(it);
  };
  printerrln = function(it){
    return printerr(it + "\n");
  };
  out$.red = red;
  out$.green = green;
  out$.yellow = yellow;
  out$.magenta = magenta;
  out$.grey = grey;
  out$.levelMark = levelMark;
  out$.levelValue = levelValue;
  out$.worseLevel = worseLevel;
  out$.worstLevel = worstLevel;
  out$.print = print;
  out$.println = println;
  out$.printerr = printerr;
  out$.printerrln = printerrln;
}).call(this);
