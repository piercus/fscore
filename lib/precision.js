var tP = require("./tPositive.js")

module.exports = function(expected, actual, options, tPositive){
  if(typeof(tPositive) !== "number"){
    tPositive = tP(expected, actual, options);
  }
  return tPositive/actual.length;
};
