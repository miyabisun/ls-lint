(function(){
  var ref$, levelMark, printerrln;
  ref$ = require('./report-utils'), levelMark = ref$.levelMark, printerrln = ref$.printerrln;
  module.exports = function(error){
    var this$ = this;
    return printerrln(
    function(it){
      return "\n  " + levelMark('fatal') + " " + it + "\n";
    }(
    function(it){
      return it.toString();
    }(
    error)));
  };
}).call(this);
