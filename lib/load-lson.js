(function(){
  var fs, lsc;
  fs = require('fs');
  lsc = require('livescript');
  module.exports = function(lsonFile){
    return JSON.parse(
    lsc.compile(fs.readFileSync(lsonFile, {
      encoding: 'utf8'
    }), {
      json: true
    }));
  };
}).call(this);
